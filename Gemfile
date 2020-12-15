# frozen_string_literal: true

source "https://rubygems.org"

ruby RUBY_VERSION
# DECIDIM_VERSION={:git => 'https://github.com/decidim/decidim.git', :branch => 'master'}
DECIDIM_VERSION = { git: "https://github.com/Platoniq/decidim.git", branch: "temp/0.22-surveys" }.freeze

gem "decidim", DECIDIM_VERSION
# gem "decidim-consultations", DECIDIM_VERSION
# gem "decidim-initiatives", DECIDIM_VERSION

gem "decidim-decidim_awesome", git: "https://github.com/Platoniq/decidim-module-decidim_awesome", branch: "feat/improve-map"
gem "decidim-notify", git: "https://github.com/Platoniq/decidim-module-notify"
gem "decidim-term_customizer", git: "https://github.com/Platoniq/decidim-module-term_customizer", branch: "temp/0.22"

gem "bootsnap", "~> 1.4"

gem "puma", "~> 4.3"
gem "uglifier", "~> 4.1"

gem "faker", "~> 1.9"
gem "health_check"
gem "rspec"
gem "sentry-raven"

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
  gem "fog-aws"
  gem "sidekiq", "~> 6.0"
  gem "sidekiq-cron"
end
