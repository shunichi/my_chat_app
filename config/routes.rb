Rails.application.routes.draw do
  root to: 'home#index'

  get '/room', to: 'rooms#show'

  get '/signin', to: 'sessions#new', as: :signin
  get '/auth/:provider/callback', to: 'sessions#create'
  delete '/signout', to: 'sessions#destroy', as: :signout
end
