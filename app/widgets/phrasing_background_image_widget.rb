require 'phrasing_plus/dummy_image'

class PhrasingBackgroundImageWidget < SimpleDelegator

  HTML_CLASS = 'phrasable-background-image'

  attr_accessor :options, :wrapped_html

  def initialize(phrasing_image, view_context, options = {}, wrapped_html)
    super(phrasing_image)
    @view_context = view_context
    @options = options
    @tag = options.delete(:tag)
    @wrapped_html = wrapped_html

    return unless view_context.can_edit_phrases?

    add_phrasable_image_class
    add_image_to_style
  end

  def image_url
    image.url || PhrasingPlus::DummyImage.new(options).url
  end

  def tag
    @tag || :div
  end

  private

  attr_accessor :view_context

  def add_phrasable_image_class
    options[:class] = [options[:class], HTML_CLASS].compact.join(' ')
  end

  def add_image_to_style
    options[:style] = "background-image: url(#{image_url})"
  end
end
