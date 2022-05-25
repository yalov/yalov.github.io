source 'https://rubygems.org'
# The GitHub Pages commonmarker dependency does not support Ruby 4 yet.
ruby '< 4.0'

gem 'github-pages', '>= 232', group: :jekyll_plugins

# Liquid expects BigDecimal, which newer Ruby versions do not bundle.
gem 'bigdecimal'

# listen (serve) requires an extra gem for compatibility with Windows.
# gem 'wdm', '~> 0.1.0' if Gem.win_platform?
gem 'wdm', '>= 0.1.0' if Gem.win_platform?

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
# gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
