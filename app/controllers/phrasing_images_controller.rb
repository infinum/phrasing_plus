class PhrasingImagesController < ActionController::Base
  include PhrasingHelper

  def update
    phrasing_image = PhrasingImage.find(params[:id])
    phrasing_image.image = params[:phrasing_image][:image]

    if phrasing_image.save
      render json: phrasing_image, status: 200
    else
      render json: { errors: phrasing_image.errors.values.first }, status: 403
    end
  end

end
