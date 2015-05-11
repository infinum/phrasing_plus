module PhrasingPlusHelper
  def phrasing_image_tag(key, options = {})
    image = PhrasingImage.find_or_create_by(key: key)
    image_widget = PhrasingImageWidget.new(image, self, options)
    render 'phrasing_plus/editable_image', image_widget: image_widget
  end
end
