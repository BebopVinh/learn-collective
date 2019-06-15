class Section < ApplicationRecord
   validates_presence_of :name
   belongs_to :category
   has_many :lessons

   accepts_nested_attributes_for :category, reject_if: :all_blank

end
