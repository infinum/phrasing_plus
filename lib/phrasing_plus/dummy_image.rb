module PhrasingPlus
  class DummyImage

    BG_COLOR = '7d857c'
    COLOR = 'dea9bb'

    def initialize(options = {})
      @options = options
    end

    def url
      "//placehold.it/#{size}/#{BG_COLOR}/#{COLOR}"
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
end
