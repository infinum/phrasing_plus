class PhrasingImageUploader < CarrierWave::Uploader::Base
  storage PhrasingPlus.storage

  def extension_white_list
    %w(jpg jpeg gif png)
  end

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end
end
