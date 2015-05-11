class CreatePhrasingImages < ActiveRecord::Migration
  def change
    create_table :phrasing_images do |t|
      t.string :key
      t.string :image

      t.timestamps null: false
    end
  end
end
