require 'phrasing_plus/dummy_image'

class PhrasingBackgroundImageWidget < SimpleDelegator

  HTML_CLASS = 'phrasable-background-image'

  attr_accessor :options, :wrapped_html

  def initialize(phrasing_image, view_context, wrapped_html, options = {})
    super(phrasing_image)
    @view_context = view_context
    @wrapped_html = wrapped_html
    @options = options
    @default_image = @options.delete(:default_image)
    @options[:style] = "background-image: url(#{image_url})"
    @tag = @options.delete(:tag)

    return unless view_context.can_edit_phrases?

    add_phrasable_image_class
  end

  def tag
    @tag || :div
  end

  private

  def image_url
    image.url || default_image && view_context.asset_url(default_image) || PhrasingPlus::DummyImage.new(options).url
  end

  def add_phrasable_image_class
    options[:class] = [options[:class], HTML_CLASS].compact.join(' ')
  end

end
