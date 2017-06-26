class CreateBeers < ActiveRecord::Migration[5.1]
  def change
    create_table :beers do |t|
      t.string :name
      t.string :description



      t.string :abv
      t.string :ibu
      t.integer :glasswareId
      t.string :glass
      t.integer :srmId
      t.string :availableId
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



      t.references :brewery, index: true, foreign_key: true

      t.timestamps
    end
  end
end
