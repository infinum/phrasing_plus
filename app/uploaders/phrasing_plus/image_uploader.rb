module PhrasingPlus
  class ImageUploader < CarrierWave::Uploader::Base
    storage :file
  end
end
