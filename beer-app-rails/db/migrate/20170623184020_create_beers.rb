class CreateBeers < ActiveRecord::Migration[5.1]
  def change
    create_table :beers do |t|
      t.string :name
      t.string :description



      t.float :abv
      t.float :ibu
      t.integer :glasswareId
      t.string :glass
      t.integer :srmId
      t.string :available
      t.integer :styleId
      t.string :isOrganic
      t.string :hasLabels
      t.string :year
      t.string :status
      t.string :foodPairings
      t.string :servingTemperature
      t.string :servingTemperatureDisplay
      t.integer :beerVariationId
      t.string :beerVariation
      t.string :category
      t.string :style_name
      t.string :srm_name
      t.string :srm_hex

      t.string :abv_strength
      t.string :bitterness

      t.string :brewery_name
      t.string :icon
      t.string :medium
      t.string :large
      t.string :squareMedium
      t.string :squareLarge
      t.string :brewery_website






      t.references :brewery, index: true, foreign_key: true

      t.timestamps
    end
  end
end
