# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'httparty'

Brewery.destroy_all
Beer.destroy_all
Comment.destroy_all

all_breweries = []
all_beers = []

# 194
1.times do |page|
  breweriesUrl = "http://api.brewerydb.com/v2/locations/?key=9cbedc703b22c38506ed1375ea350381&p=#{page}"
  breweriesResponse = HTTParty.get(breweriesUrl).parsed_response["data"]

  for brewery in breweriesResponse do
    all_breweries.push(brewery)

    if brewery["brewery"]["images"]
      icon = brewery["brewery"]["images"]["icon"]
      medium = brewery["brewery"]["images"]["medium"]
      large = brewery["brewery"]["images"]["large"]
      squareMedium = brewery["brewery"]["images"]["squareMedium"]
      squareLarge = brewery["brewery"]["images"]["squareLarge"]
    else
      icon = "http://silhouettesfree.com/holiday-and-festive/saint-patrick-s-day/beer-silhouette-image-2.png"
      medium = "http://silhouettesfree.com/holiday-and-festive/saint-patrick-s-day/beer-silhouette-image-2.png"
      large = "http://silhouettesfree.com/holiday-and-festive/saint-patrick-s-day/beer-silhouette-image-2.png"
      squareMedium = "http://silhouettesfree.com/holiday-and-festive/saint-patrick-s-day/beer-silhouette-image-2.png"
      squareLarge = "http://silhouettesfree.com/holiday-and-festive/saint-patrick-s-day/beer-silhouette-image-2.png"
    end

    this_brewery = Brewery.create!(loc_id: brewery["id"],
    name: brewery["brewery"]["name"],
    streetAddress: brewery["streetAddress"],
    locality: brewery["locality"],
    country: brewery["country"]["name"],
    region: brewery["region"],
    locationTypeDisplay: brewery["locationTypeDisplay"],
    isClosed: brewery["isClosed"],
    yearOpened: brewery["yearOpened"],
    phone: brewery["phone"],
    website: brewery["website"],
    hoursOfOperation: brewery["hoursOfOperation"],
    latitude: brewery["latitude"],
    longitude: brewery["longitude"],
    description: brewery["brewery"]["description"],
    isOrganic: brewery["brewery"]["isOrganic"],
    icon: icon,
    medium: medium,
    large: large,
    squareMedium: squareMedium,
    squareLarge: squareLarge,
    isMassOwned: brewery["brewery"]["isMassOwned"],
    brandClassification: brewery["brewery"]["brandClassification"]

    # squareLarge: brewery["brewery"]["squareLarge"],
    # squareLarge: brewery["brewery"]["squareLarge"],
    # squareLarge: brewery["brewery"]["squareLarge"],


    )

    breweryId = brewery["breweryId"]
    puts "breweryId: #{breweryId}"
    breweryBeersUrl = "http://api.brewerydb.com/v2/brewery/#{breweryId}/beers/?key=9cbedc703b22c38506ed1375ea350381"
    breweriesBeersResponse = HTTParty.get(breweryBeersUrl).parsed_response["data"]



    if breweriesBeersResponse
      for beer in breweriesBeersResponse do
        all_beers.push(beer)

        if beer["style"]
          category = beer["style"]["category"]["name"]
          style_name = beer["style"]["shortName"]
        else
          category = nil
          style_name = nil
        end

        if beer["glass"]
          glass = beer["glass"]["name"]
        else
          glass = nil
        end

        if beer["available"]
          available = beer["available"]["name"]
        else
          available = nil
        end

        if beer["srm"]
          srm_name = beer["srm"]["name"]
          srm_hex = beer["srm"]["hex"]
        else
          srm_name = nil
          srm_hex = nil
        end

        puts "Beer: #{beer["name"]}"
        this_beer = Beer.create!(
        name: beer["name"],
        description: beer["description"],
        abv: beer["abv"],
        ibu: beer["ibu"],
        glasswareId: beer["glasswareId"],
        glass: glass,
        srm_name: srm_name,
        srm_hex: srm_hex,
        available: available,
        styleId: beer["styleId"],
        isOrganic: beer["isOrganic"],
        hasLabels: beer["hasLabels"],
        year: beer["year"],
        status: beer["status"],
        foodPairings: beer["foodPairings"],
        servingTemperature: beer["servingTemperature"],
        servingTemperatureDisplay: beer["servingTemperatureDisplay"],
        beerVariationId: beer["beerVariationId"],
        beerVariation: beer["beerVariation"],
        category: category,
        style_name: style_name,

        brewery: this_brewery
        )
      end
    else
      puts "This brewery has no beers"
    end

  end

end

puts "HTTParty Location Done"

# for location in all_locations do
#   this_location = Location.create!(loc_id: location["id"], name: location["name"], streetAddress: location["streetAddress"])
#   #  brewery = location["brewery"]
# end
#
# puts "Location objects created"
#
# # 1290
# 1.times do |page|
#   beersUrl = "http://api.brewerydb.com/v2/beers/?key=9cbedc703b22c38506ed1375ea350381&p=#{page}&withBreweries=Y"
#   beersResponse = HTTParty.get(beersUrl).parsed_response["data"]
#
#   for beer in beersResponse do
#     all_beers.push(beer)
#   end
# end
#
# puts "HTTParty Beer Done"
#
#
# for beer in all_beers do
#
#   location = beer["breweries"][0]["locations"][0]["id"]
#   puts location
#   beer_location = Location.find_by(loc_id: location)
#   puts beer_location
#
#   this_beer = Beer.create!(name: beer["name"], description: beer["description"], location: beer_location)
# end
#
# puts "Beer objects created"




puts all_breweries.length
puts all_beers.length
