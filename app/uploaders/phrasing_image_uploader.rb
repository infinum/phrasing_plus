class PhrasingImageUploader < CarrierWave::Uploader::Base
  storage :file

  def extension_white_list
    %w(jpg jpeg gif png)
  end
end
