class CreatePhrasingPlusPhrasingImages < ActiveRecord::Migration
  def change
    create_table :phrasing_plus_phrasing_images do |t|
      t.string :key
      t.string :image

      t.timestamps null: false
    end
  end
end
