import test from 'node:test';
import assert from 'node:assert/strict';
import { collectRepositories, fetchList } from './update-github-repos.mjs';

function response(body, link = '', status = 200) {
  return { ok: status === 200, status, json: async () => body, headers: { get: () => link } };
}

test('paginates repositories and releases, excludes forks/private/drafts, and totals all assets', async () => {
  const root = 'https://api.github.com';
  const calls = [];
  const repository = name => ({ name, url: root + '/repos/yalov/' + name,
    html_url: 'https://github.com/yalov/' + name, topics: ['c-plus-plus'],
    pushed_at: '2026-11-25T12:00:00Z', description: '<example>' });
  const asset = { name: 'example.zip', size: 1024, download_count: 7,
    browser_download_url: 'https://github.com/yalov/b/releases/download/v1/example.zip' };
  const pages = new Map([
    [root + '/users/yalov/repos?type=owner&per_page=100', response([
      repository('b'), { ...repository('fork'), fork: true }, { ...repository('private'), private: true }
    ], '<' + root + '/users/yalov/repos?page=2>; rel="next"')],
    [root + '/users/yalov/repos?page=2', response([repository('a')])],
    [root + '/repos/yalov/b/releases?per_page=100', response([
      { draft: true, tag_name: 'draft', assets: [asset] },
      { tag_name: 'v2-beta', html_url: 'https://github.com/yalov/b/releases/tag/v2-beta', prerelease: true, assets: [asset] }
    ], '<' + root + '/repos/yalov/b/releases?page=2>; rel="next"')],
    [root + '/repos/yalov/b/releases?page=2', response([{ tag_name: 'v1', assets: [asset, asset] }])],
    [root + '/repos/yalov/a/releases?per_page=100', response([])]
  ]);
  const repositories = await collectRepositories('yalov', {
    token: 'test-token',
    fetchImpl: async (url, options) => {
      calls.push(url);
      assert.equal(options.headers.Authorization, 'Bearer test-token');
      assert.equal(options.headers.Accept, 'application/vnd.github+json');
      assert.ok(pages.has(url), 'Unexpected request: ' + url);
      return pages.get(url);
    }
  });
  assert.equal(calls.length, 5);
  assert.deepEqual(repositories.map(repo => repo.name), ['a', 'b']);
  assert.equal(repositories[0].latest_release, null);
  assert.equal(repositories[0].download_count, 0);
  assert.equal(repositories[1].download_count, 21);
  assert.equal(repositories[1].latest_release.tag_name, 'v2-beta');
  assert.equal(repositories[1].latest_release.html_url, 'https://github.com/yalov/b/releases/tag/v2-beta');
  assert.equal(repositories[1].description, '<example>');
  assert.deepEqual(repositories[1].topics, ['c-plus-plus']);
});

test('rejects API failures, including failures after the first page', async () => {
  for (const status of [403, 404, 429, 500]) {
    await assert.rejects(fetchList('https://api.github.com/first', {
      fetchImpl: async url => url.endsWith('/first')
        ? response([], '<https://api.github.com/second>; rel="next"')
        : response({}, '', status)
    }), new RegExp('GitHub API returned ' + status));
  }
  await assert.rejects(fetchList('https://api.github.com/first', {
    fetchImpl: async () => response({ message: 'unexpected' })
  }), /Expected a GitHub API list/);
});

