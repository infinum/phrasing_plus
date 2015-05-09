class PhrasingImagesController < ActionController::Base
  include PhrasingHelper

  def update
    phrasing_image = PhrasingPlus::PhrasingImage.find(params[:id])
    phrasing_image.image = params[:phrasing_image][:image]

    if phrasing_image.save
      render json: phrasing_image, status: 200
    else
      render status: 403
    end
  end

end
