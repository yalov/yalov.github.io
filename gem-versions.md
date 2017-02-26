---
layout: page
title: dependency of github-pages gem
description: "List dependency versions of GitHub Pages gem"
---
<br>

gem | version
:-----| :-----
jekyll | {{site.github.versions.jekyll}}
github-pages | {{site.github.versions.github-pages}}
liquid | {{site.github.versions.liquid}}
{% for version in site.github.versions %}{% unless version[0] == "jekyll" or version[0] == "github-pages" or version[0] == "liquid" %}{{version[0]}} | {{version[1]}}
{% endunless %}{% endfor %}
