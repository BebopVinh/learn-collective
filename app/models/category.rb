class Category < ApplicationRecord
   validates_presence_of :name
   has_many :sections
   has_many :lessons, through: :sections

   def self.filtered_sections(category)
      Category.find_by_name(category).sections
   end
end
