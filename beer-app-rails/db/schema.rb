# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170623184101) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "beers", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.float "abv"
    t.string "ibu"
    t.integer "glasswareId"
    t.string "glass"
    t.integer "srmId"
    t.string "availableId"
    t.string "available"
    t.integer "styleId"
    t.string "isOrganic"
    t.string "hasLabels"
    t.string "year"
    t.string "status"
    t.string "foodPairings"
    t.string "servingTemperature"
    t.string "servingTemperatureDisplay"
    t.integer "beerVariationId"
    t.string "beerVariation"
    t.bigint "brewery_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["brewery_id"], name: "index_beers_on_brewery_id"
  end

  create_table "breweries", force: :cascade do |t|
    t.string "loc_id"
    t.string "name"
    t.string "streetAddress"
    t.string "locality"
    t.string "country"
    t.string "region"
    t.string "locationTypeDisplay"
    t.string "isClosed"
    t.string "yearOpened"
    t.string "phone"
    t.string "website"
    t.string "hoursOfOperation"
    t.float "latitude"
    t.float "longitude"
    t.string "description"
    t.string "icon"
    t.string "medium"
    t.string "large"
    t.string "squareMedium"
    t.string "squareLarge"
    t.string "isMassOwned"
    t.string "brandClassification"
    t.string "isOrganic"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "comments", force: :cascade do |t|
    t.string "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "beers", "breweries"
end
