class Brewery < ApplicationRecord

  has_many :beers
  # , :primary_key => :loc_id
  serialize :beers_list, Array

end
