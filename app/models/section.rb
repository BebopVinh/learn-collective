class Section < ApplicationRecord
   validates_presence_of :name
   belongs_to :category
   has_many :lessons
end
