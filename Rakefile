# require 'html/proofer'
# # rake test
# desc "build and test website"
# task :test do
#   sh "bundle exec jekyll build"
#   HTML::Proofer.new("./_site", {
#     :href_ignore => ['http://localhost:4000', 'https://www.linkedin.com/in/wouterbulten'],
#     :verbose => true,
#     :check_favicon => true,
#     :check_html => true,
#     :disable_external => true,
#     #:error_sort => 'desc',
#     :href_swap => {
#       'https://wouterbulten.nl' => '', # canonical link in head
#     },
#   }).run
# end

require "rubygems"
require 'rake'
require 'yaml'
require 'time'

#Load custom rake scripts
Dir['_rake/*.rake'].each { |r| load r }