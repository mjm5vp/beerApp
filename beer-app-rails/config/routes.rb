Rails.application.routes.draw do


  root to: "beers#beers"

  resources :breweries do
    resources :beers
  end

  resources :beers




  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
