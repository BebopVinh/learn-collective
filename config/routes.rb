Rails.application.routes.draw do
  # resources :photos for future implementation of photo uploads


  resources :lessons do
    resources :contributions, only: [:create]
  end
  
  resources :contributions, only: [:edit, :update, :destroy]
  devise_for :users, controllers: {registrations: "registrations", omniauth_callbacks: "callbacks"}

  resources :users, only: [:show]
  resources :categories, only: [:index, :show]
  resources :sections, only: [:show]

  get '/authenticate/user', to: 'application#authenticate_user'
  get '/dev_log', to: 'application#dev_log'

  # WIP: Filtered Sections based on Category Selection
  # get '/filtered_sections', to: 'lessons#filtered_sections'
  
  root to:"application#home"

end
