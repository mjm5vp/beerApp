class CreateBeers < ActiveRecord::Migration[5.1]
  def change
    create_table :beers do |t|
      t.string :name
      t.string :description
      t.references :location, index: true, foreign_key: true

      t.timestamps
    end
  end
end
