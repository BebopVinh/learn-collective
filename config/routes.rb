Rails.application.routes.draw do
  # resources :photos for future implementation of photo uploads


  resources :lessons do
    resources :contributions, only: [:create]
  end
  
  resources :contributions, only: [:edit, :update, :destroy]
  devise_for :users, controllers: {registrations: "registrations", omniauth_callbacks: "callbacks"}

  resources :users, only: [:show]
  resources :categories, only: [:index, :show]

  root to:"application#home"

end
