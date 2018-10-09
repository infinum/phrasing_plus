$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "phrasing_plus/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "phrasing_plus"
  s.version     = PhrasingPlus::VERSION
  s.authors     = ["Damir Svrtan"]
  s.email       = ["damir.svrtan@gmail.com"]
  s.homepage    = "https://github.com/infinum/phrasing_plus"
  s.summary     = "Edit images inline"
  s.description = "A mountable Phrasing adapter for editing images inline."
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]

  s.add_dependency "rails", ">= 4.2.1"
  s.add_dependency "phrasing", ">= 4.0.0rc5"
  s.add_dependency "carrierwave", "~> 0.10.0"

  s.add_development_dependency "sqlite3"
  s.add_development_dependency "pry-rails"
  s.add_development_dependency "rspec-rails"
end
