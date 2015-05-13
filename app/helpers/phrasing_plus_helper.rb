module PhrasingPlusHelper
  def phrasing_image_tag(key, options = {})
    image = PhrasingImage.find_or_create_by(key: key)
    image_widget = PhrasingImageWidget.new(image, self, options)
    render 'phrasing_plus/editable_image', widget: image_widget
  end

  def phrasing_background_image_tag(key, options = {})
    image = PhrasingImage.find_or_create_by(key: key)
    image_widget = PhrasingBackgroundImageWidget.new(image, self, options)
    render 'phrasing_plus/editable_background_image', widget: image_widget
  end
end
