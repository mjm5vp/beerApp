# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'httparty'

Location.destroy_all
Beer.destroy_all
Comment.destroy_all

all_locations = []
all_beers = []

# 194
1.times do |page|
  locationsUrl = "http://api.brewerydb.com/v2/locations/?key=9cbedc703b22c38506ed1375ea350381&p=#{page}"
  locationsResponse = HTTParty.get(locationsUrl).parsed_response["data"]




  for location in locationsResponse do
    all_locations.push(location)
  end
end

puts "HTTParty Location Done"

for location in all_locations do
  this_location = Location.create!(loc_id: location["id"], name: location["name"], streetAddress: location["streetAddress"])
  #  brewery = location["brewery"]
end

puts "Location objects created"

# 1290
1.times do |page|
  beersUrl = "http://api.brewerydb.com/v2/beers/?key=9cbedc703b22c38506ed1375ea350381&p=#{page}withBreweries=Y"
  beersResponse = HTTParty.get(beersUrl).parsed_response["data"]

  for beer in beersResponse do
    all_beers.push(beer)
  end
end

puts "HTTParty Beer Done"


for beer in all_beers do

  location = beer[:breweries]
  puts location
  # beer_location = Location.find_by(id: location)
  # puts beer_location

  # this_beer = Beer.create!(name: beer["name"], description: beer["description"], location: beer_location)
end

puts "Beer objects created"




puts all_locations.length
puts all_beers.length
