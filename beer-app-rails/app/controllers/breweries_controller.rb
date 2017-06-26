class BreweriesController < ApplicationController
  def index
    @breweries = Brewery.all

    render json: @breweries.to_json, status: :ok
  end

  def show
    @brewery = Brewery.find(params[:id])
    # @beers = @brewery.beers

    render json: @brewery.to_json, status: :ok
  end
end
