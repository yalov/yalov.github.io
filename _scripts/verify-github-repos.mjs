import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const data = JSON.parse(await readFile('_data/github_repos.json', 'utf8'));
const html = await readFile('_site/github-repos.html', 'utf8');
assert.ok(data.repositories.length > 0, 'Repository data must not be empty');
assert.equal((html.match(/class="repository-row"/g) || []).length, data.repositories.length,
  'The built page must include every repository');
assert.ok(!/GetLatestReleaseInfo|api\.github\.com|Loading…/.test(html),
  'The page must render all repository data without browser API requests');
assert.ok(html.includes('Updated <time'), 'The page must show its data refresh date');
console.log('Verified static page for ' + data.repositories.length + ' repositories.');
