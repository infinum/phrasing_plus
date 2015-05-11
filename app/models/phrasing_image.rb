class PhrasingImage < ActiveRecord::Base
  mount_uploader :image, PhrasingImageUploader

  validates :key, presence: true
end
