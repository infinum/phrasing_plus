Rails.application.routes.draw do
  resources :phrasing_images, only: [:update]
end
