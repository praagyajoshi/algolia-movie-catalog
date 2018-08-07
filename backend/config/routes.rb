Rails.application.routes.draw do

  # /api/v1 routes
  namespace :api do
    namespace :v1 do
      resources :movies, only: [:create, :destroy]
    end
  end

  # catch all routes
  match "*path", to: "application#handle_route_not_found", via: :all

end
