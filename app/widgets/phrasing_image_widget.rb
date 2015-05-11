class PhrasingImageWidget < SimpleDelegator

  HTML_CLASS = 'phrasable-image'
  WRAPPER_HTML_CLASS = 'phrasable-image-wrapper'

  attr_accessor :options, :wrapper_options

  def initialize(phrasing_image, view_context, options = {})
    super(phrasing_image)
    @view_context = view_context
    @options = options
    @wrapper_options = @options.delete(:wrapper_html) || {}

    return unless view_context.can_edit_phrases?

    add_phrasable_image_class
    add_phrasable_image_wrapper_class
  end

  def image_url
    image.url || DummyImage.new(options).url
  end

  private

  attr_accessor :view_context

  def add_phrasable_image_class
    if options[:class].present?
      options[:class] += ' ' + HTML_CLASS
    else
      options[:class] = HTML_CLASS
    end
  end

  def add_phrasable_image_wrapper_class
    if wrapper_options[:class].present?
      wrapper_options[:class] += ' ' + WRAPPER_HTML_CLASS
    else
      wrapper_options[:class] = WRAPPER_HTML_CLASS
    end
  end

end

class DummyImage

  BG_COLOR = '7d857c'
  COLOR = 'dea9bb'

  def initialize(options = {})
    @options = options
  end

  def url
    "http://dummyimage.com/#{size}/#{BG_COLOR}/#{COLOR}.png"
  end

  private

  attr_accessor :options

  def size
    options[:size] || "#{width}x#{height}"
  end

  def width
    options[:width] || 300
  end

  def height
    options[:height] || 300
  end
end
