Rails.application.routes.draw do
  mount PhrasingPlus::Engine => "/phrasing_plus"
  root 'static_pages#index'
end
