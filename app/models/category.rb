class Category < ApplicationRecord
   validate_presence_of :name
   has_many :sections
end
