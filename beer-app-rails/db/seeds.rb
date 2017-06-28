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
beer_id_count = 0

def location_check(brew)

  compare_brew = {region: brew["region"]}
    # , locality: brew["locality"]}

  locations = [
    # {region: "Virginia", locality: "Alexandria"},
    # {region: "Virginia", locality: "Fairfax"},
    # {region: "Virginia", locality: "Falls Church"},
    # {region: "Virginia", locality: "Leesburg"},
    # {region: "Virginia", locality: "Lovettsville"},
    # {region: "Virginia", locality: "Arlington"},
    # {region: "Virginia", locality: "McLean"},
    # {region: "Virginia", locality: "Manassas"},
    # {region: "Virginia", locality: "Reston"},
    # {region: "Virginia", locality: "Centreville"},
    # {region: "Virginia", locality: "Vienna"},
    # {region: "Virginia", locality: "Annadale"},
    #
    # {region: "District of Columbia", locality: "Washington"},
    #
    # {region: "Maryland", locality: "Annadale"},
    # {region: "Maryland", locality: "Annadale"},
    # {region: "Maryland", locality: "Annadale"},
    # {region: "Maryland", locality: "Annadale"},
    # {region: "Maryland", locality: "Annadale"},
    # {region: "Maryland", locality: "Annadale"},

    {region: "Virginia"},
    {region: "Maryland"},
    {region: "District of Columbia"}

  ]
  if locations.include? compare_brew
    puts brew["locality"]
    return true
  else
    return false
  end
end

# 194
194.times do |page|
  puts "page: #{page}"
  breweriesUrl = "http://api.brewerydb.com/v2/locations/?key=9cbedc703b22c38506ed1375ea350381&p=#{page}"
  breweriesResponse = HTTParty.get(breweriesUrl).parsed_response["data"]

  for brewery in breweriesResponse do
    if location_check(brewery)
      if !all_breweries.any?{|a| a["streetAddress"] == brewery["streetAddress"]}
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

      breweryId = brewery["breweryId"]
      # puts "breweryId: #{breweryId}"
      breweryBeersUrl = "http://api.brewerydb.com/v2/brewery/#{breweryId}/beers/?key=9cbedc703b22c38506ed1375ea350381"
      breweriesBeersResponse = HTTParty.get(breweryBeersUrl).parsed_response["data"]

      brewery_beers = []

      if breweriesBeersResponse
        for beer in breweriesBeersResponse do
          beer_id_count = beer_id_count + 1
          beer[:id] = beer_id_count
          brewery_beers.push(beer)
        end
        puts brewery_beers.length
      else
        brewery_beers = nil
      end



      this_brewery = Brewery.create!(loc_id: brewery["id"],
      name: brewery["brewery"]["name"],
      streetAddress: brewery["streetAddress"],
      locality: brewery["locality"],
      country: brewery["country"]["name"],
      a_region: brewery["region"],
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
      brandClassification: brewery["brewery"]["brandClassification"],

      beers_list: brewery_beers

      # squareLarge: brewery["brewery"]["squareLarge"],
      # squareLarge: brewery["brewery"]["squareLarge"],
      # squareLarge: brewery["brewery"]["squareLarge"],


      )
      puts "brewery created"





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

          case beer["abv"].to_i
          when 12..50
            abv_strength = "very high"
          when 9..11.99
            abv_strength = "high"
          when 7..8.99
            abv_strength = "medium"
          when 4..6.99
            abv_strength = "low"
          when 0..3.99
            abv_strength = "very low"
          end

          case beer["ibu"].to_i
          when 60..500
            bitterness = "very high"
          when 45..59.99
            bitterness = "high"
          when 30..44.99
            bitterness = "medium"
          when 10..29.99
            bitterness = "low"
          when 0..9.99
            bitterness = "very low"
          end

          # puts "Beer: #{beer["name"]}"
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

          abv_strength: abv_strength,
          bitterness: bitterness,
          a_brewery_state: brewery["region"],

          brewery_name: brewery["brewery"]["name"],
          icon: icon,
          medium: medium,
          large: large,
          squareMedium: squareMedium,
          squareLarge: squareLarge,
          brewery_website: brewery["website"],

          brewery: this_brewery
          )



        end
      else
        # puts "This brewery has no beers"
      end
    end
  end
end
end



def find_localities
  all_localities = []

  194.times do |page|
      breweriesUrl = "http://api.brewerydb.com/v2/locations/?key=9cbedc703b22c38506ed1375ea350381&p=#{page}"
      breweriesResponse = HTTParty.get(breweriesUrl).parsed_response["data"]

      for brewery in breweriesResponse do
        # if location_check(brewery)
        if brewery["region"] == "Maryland"
          # puts brewery["locality"]
          all_localities.push(brewery["locality"])
        end

      end

  end
  all_localities.uniq!
  for loc in all_localities
    puts loc
  end
end


puts "HTTParty Location Done"








puts all_breweries.length
puts all_beers.length
puts beer_id_count


# Sample seed data for comment part
aaa=Comment.create(title:"aaa", body:"aaaaaaaaaaaaaaaaa")
bbb=Comment.create(title:"bbb", body:"bbbbbbbbbbbbbbbbbbbbbb")
ccc=Comment.create(title:"bbb", body:"cccccccccccccccccccc")
