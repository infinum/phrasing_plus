module PhrasingPlus
  class PhrasingImage < ActiveRecord::Base
    mount_uploader :image, ImageUploader

    validates :key, presence: true
  end
end
