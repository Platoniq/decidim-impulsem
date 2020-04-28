# frozen_string_literal: true

source "https://rubygems.org"

ruby RUBY_VERSION
# DECIDIM_VERSION={:git => 'https://github.com/decidim/decidim.git', :branch => 'master'}
DECIDIM_VERSION = { git: "https://github.com/Platoniq/decidim.git", branch: "0.21-platoniq" }

gem "decidim", DECIDIM_VERSION
# gem "decidim-consultations", DECIDIM_VERSION
# gem "decidim-initiatives", DECIDIM_VERSION

gem "decidim-decidim_awesome", git: "https://github.com/Platoniq/decidim-module-decidim_awesome"

gem "bootsnap", "~> 1.4"

gem "puma", "~> 4.3"
gem "uglifier", "~> 4.1"

gem "faker", "~> 1.9"
gem "health_check"
gem "sentry-raven"
gem "rspec"

group :development, :test do
  gem "byebug", "~> 11.0", platform: :mri

  gem "decidim-dev", DECIDIM_VERSION
end

group :development do
  gem "letter_opener_web", "~> 1.3"
  gem "listen", "~> 3.1"
  gem "spring", "~> 2.0"
  gem "spring-watcher-listen", "~> 2.0"
  gem "web-console", "~> 3.5"
end

group :production do
  gem "sidekiq", "~> 6.0"
  gem "sidekiq-cron"
  gem "fog-aws"
end
