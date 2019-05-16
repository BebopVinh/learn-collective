Rails.application.routes.draw do
  resources :images
  resources :lessons, only: [:show, :index] do
    resources :contributions, only: [:create]
  end
  
  resources :contributions, only: [:edit, :update, :destroy]
  devise_for :users, controllers: {registrations: "registrations", omniauth_callbacks: "callbacks"}

  root to:"application#home"

end
