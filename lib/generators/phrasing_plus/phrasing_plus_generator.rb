class PhrasingPlusGenerator < Rails::Generators::Base
  include Rails::Generators::Migration
  source_root File.expand_path('../templates', __FILE__)

  def create_migrations
    phrasing_image_migration = "db/migrate/create_phrasing_images.rb"
    migration_template phrasing_image_migration, phrasing_image_migration
  end

  def self.next_migration_number(*)
    Time.now.utc.strftime("%Y%m%d%H%M%S")
  end
end
