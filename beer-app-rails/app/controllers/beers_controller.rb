class BeersController < ApplicationController
  def index

    @brewery = Brewery.find(params[:brewery_id])
    @beers = @brewery.beers

    render json: @beers.to_json, status: :ok
  end

  def show
    @brewery = Brewery.find(params[:brewery_id])
    @beer = @brewery.beers.find(params[:id])

    render json: @beer.to_json, status: :ok
  end
  def beers
    @all_beers = Beer.all
    render json: @all_beers.to_json, status: :ok
  end

  def beers_show
    @beer = Beer.find(params[:id])

    render json: @beer.to_json, status: :ok

  end
end
