module PhrasingPlus
  class ImagesController < ApplicationController
    include PhrasingHelper

    def update
      phrasing_image = PhrasingImage.find(params[:id])
      phrasing_image.image = params[:image]

      if phrasing_image.save
        render status: 200
      else
        render status: 403
      end
    end

  end
end
