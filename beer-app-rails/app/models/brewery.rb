class Brewery < ApplicationRecord

  has_many :beers
  # , :primary_key => :loc_id

end
