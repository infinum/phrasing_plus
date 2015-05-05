module PhrasingPlus
  module ApplicationHelper

    # e.g. 300x300
    HEIGHT_AND_WIDTH_REGEX = /\d+x\d+/
    WIDTH_REGEX = /\d+/
    DUMMY_BACKGROUND_COLOR = '7d857c'
    DUMMY_TEXT_COLOR = 'dea9bb'

    def phrasing_image_tag(key, options = {})
      phrasing_image = PhrasingImage.find_or_create_by(key: key)

      image_source =  if phrasing_image.image.present?
                        phrasing_image.image.url
                      else
                        dummy_url(options[:size])
                      end

      image_tag(image_source, options)
    end

    private

    def adjusted_image_size(size)
      return '300x300' if size.nil?

      if size.match(HEIGHT_AND_WIDTH_REGEX)
        size
      elsif size.match(WIDTH_REGEX)
        "#{size}x#{size}"
      end
    end

    def dummy_url(size)
      "http://dummyimage.com/#{adjusted_image_size(size)}/#{DUMMY_BACKGROUND_COLOR}/#{DUMMY_TEXT_COLOR}.png"
    end
  end
end
