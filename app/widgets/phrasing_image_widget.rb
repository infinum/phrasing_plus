require 'phrasing_plus/dummy_image'

class PhrasingImageWidget < SimpleDelegator

  HTML_CLASS = 'phrasable-image'
  WRAPPER_HTML_CLASS = 'phrasable-image-wrapper'

  attr_accessor :options, :wrapper_options, :default_image

  def initialize(phrasing_image, view_context, options = {})
    super(phrasing_image)
    @view_context = view_context
    @options = options
    @default_image = @options.delete(:default_image)
    @wrapper_options = @options.delete(:wrapper_html) || {}

    return unless view_context.can_edit_phrases?

    add_phrasable_image_class
    add_phrasable_image_wrapper_class
  end

  def image_url
    image.url || default_image && view_context.asset_url(default_image) || PhrasingPlus::DummyImage.new(options).url
  end

  private

  attr_accessor :view_context

  def add_phrasable_image_class
    options[:class] = [options[:class], HTML_CLASS].compact.join(' ')
  end

  def add_phrasable_image_wrapper_class
    wrapper_options[:class] = [wrapper_options[:class], WRAPPER_HTML_CLASS].compact.join(' ')
  end

end
