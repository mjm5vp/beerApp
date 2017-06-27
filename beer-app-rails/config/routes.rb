Rails.application.routes.draw do


  # root to: "beers#beers"

  get '/beers', to: "beers#beers"

  get '/beers/:id', to: "beers#beers_show"

  resources :beers
  resources :comments

  resources :breweries do
    resources :beers
  end






  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
