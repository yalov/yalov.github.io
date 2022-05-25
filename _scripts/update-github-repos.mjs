import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export async function fetchList(url, { token, fetchImpl = fetch } = {}) {
  const items = [];
  while (url) {
    const headers = { Accept: 'application/vnd.github+json' };
    if (token) headers.Authorization = 'Bearer ' + token;
    const response = await fetchImpl(url, { headers, signal: AbortSignal.timeout(30000) });
    if (!response.ok) {
      throw new Error('GitHub API returned ' + response.status + ' for ' + url);
    }
    const page = await response.json();
    if (!Array.isArray(page)) throw new Error('Expected a GitHub API list for ' + url);
    items.push(...page);
    const next = (response.headers.get('link') || '').match(/<([^>]+)>;\s*rel="next"/);
    url = next ? next[1] : null;
  }
  return items;
}

export async function collectRepositories(owner, options = {}) {
  const repositories = await fetchList(
    'https://api.github.com/users/' + encodeURIComponent(owner) + '/repos?type=owner&per_page=100',
    options
  );
  const result = [];
  for (const repository of repositories.filter(repo => !repo.fork && !repo.private)) {
    const releases = (await fetchList(repository.url + '/releases?per_page=100', options))
      .filter(release => !release.draft);
    const latest = releases[0];
    result.push({
      name: repository.name,
      html_url: repository.html_url,
      description: repository.description,
      topics: repository.topics || [],
      pushed_at: repository.pushed_at,
      download_count: releases.reduce((total, release) => total + release.assets.reduce(
        (count, asset) => count + asset.download_count, 0
      ), 0),
      latest_release: latest ? {
        tag_name: latest.tag_name,
        html_url: latest.html_url
      } : null
    });
  }
  return result.sort((a, b) => a.name.localeCompare(b.name, 'en'));
}

async function main() {
  const owner = process.env.GITHUB_REPOSITORY_OWNER || 'yalov';
  const repositories = await collectRepositories(owner, { token: process.env.GITHUB_TOKEN });
  if (repositories.length === 0) throw new Error('No public, non-fork repositories found for ' + owner);
  const output = resolve('_data/github_repos.json');
  await mkdir(dirname(output), { recursive: true });
  // Write only after every API request succeeds; failed builds never deploy partial data.
  await writeFile(output, JSON.stringify({ updated_at: new Date().toISOString(), repositories }, null, 2) + '\n');
  console.log('Updated data for ' + repositories.length + ' repositories.');
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
