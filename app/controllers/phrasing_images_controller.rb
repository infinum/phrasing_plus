class PhrasingImagesController < ActionController::Base
  include PhrasingHelper
  before_action :authorize,

  def update
    phrasing_image = PhrasingImage.find(params[:id])

    if phrasing_image.update(phrasing_image_params)
      render json: phrasing_image, status: 200
    else
      render json: { errors: phrasing_image.errors.values.first }, status: 403
    end
  end

  private

  def authorize
    render(json: { errors: 'Unauthorized' }, status: 401) unless can_edit_phrases?
  end

  def phrasing_image_params
    params.require(:phrasing_image).permit(:image)
  end
end
