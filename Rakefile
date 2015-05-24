require 'html/proofer'
# rake test
desc "build and test website"
task :test do
  sh "bundle exec jekyll build"
  HTML::Proofer.new("./_site", {:href_ignore=> ['http://localhost:4000', 'https://www.linkedin.com/in/wouterbulten'], :verbose => true}).run
end