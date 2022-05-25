My user site — https://yalov.github.io/

[Jekyll](http://jekyllrb.com) Theme — [Hyde](http://hyde.getpoole.com/).

## Daily repository refresh

The `Personal website — daily refresh and publish` workflow fetches public, non-fork repositories,
topics, push dates, releases, release page links, and download counts before building
the site. `/github-repos` is rendered as static HTML and makes no GitHub API
requests in visitors' browsers.

The workflow runs daily at **03:17 UTC**, on pushes to `master`, and manually
from the Actions tab. Pull requests run the tests and full build without
deploying. A failed data refresh or build leaves the deployed site unchanged.
Generated `_data/github_repos.json` is used only during the build and is not
committed. The workflow uses the automatic `GITHUB_TOKEN`; no personal access
token is needed.

Before merging the workflow, set **Settings → Pages → Build and deployment →
Source → GitHub Actions**. Once merged, its push run deploys the site. Subsequent
daily runs refresh it without source commits. Standard hosted runners in this
public repository are free. Pages artifacts are retained for one day by the
upload action.

GitHub scheduled runs can be delayed. GitHub also disables scheduled workflows
in public repositories after 60 days without repository activity; re-enable the
workflow from Actions if that happens. See [scheduled workflow behavior](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule).

For a local build, use Node.js 24 and Ruby 3.4 with Bundler. The GitHub Pages
dependency set requires Ruby below 4.0. On Windows, install Ruby+Devkit 3.4
and the MSYS2/MINGW development toolchain, then open a new terminal.

With Ruby 3.4 active (`ruby --version`), run:

```text
node --test _scripts/update-github-repos.test.mjs
node _scripts/update-github-repos.mjs
bundle install
bundle exec jekyll serve
```

Set `GITHUB_TOKEN` in your environment if you need authenticated API limits
locally. The generator defaults to the `yalov` account; Actions supplies the
repository owner through `GITHUB_REPOSITORY_OWNER`.
