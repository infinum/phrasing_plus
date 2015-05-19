class PhrasingImageUploader < CarrierWave::Uploader::Base
  storage PhrasingPlus.storage

  def extension_white_list
    %w(jpg jpeg gif png)
  end
end
