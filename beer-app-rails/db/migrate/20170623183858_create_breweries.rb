class CreateBreweries < ActiveRecord::Migration[5.1]
  def change
    create_table :breweries do |t|
      t.string :loc_id
      t.string :name
      t.string :streetAddress
      t.string :locality
      t.string :country
      t.string :a_region
      t.string :locationTypeDisplay
      t.string :isClosed
      t.string :yearOpened
      t.string :phone
      t.string :website
      t.string :hoursOfOperation
      t.float :latitude
      t.float :longitude
      t.string :description
      t.string :icon
      t.string :medium
      t.string :large
      t.string :squareMedium
      t.string :squareLarge
      t.string :isMassOwned
      t.string :brandClassification
      t.string :isOrganic

      t.string :beers_list, default: [].to_yaml





      t.timestamps
    end
  end
end
