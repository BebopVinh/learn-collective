class Lesson < ApplicationRecord
   has_many :contributions
   has_many :users, through: :contributions
   belongs_to :section
   has_one :category, through: :section

   validates_presence_of :name, :creator_id

   accepts_nested_attributes_for :section, reject_if: :all_blank

   def clean_name
      name.gsub("-", " ")
   end

   def creator_is?(user)
      !!(self.creator_id == user.id) unless user.nil?
   end 

   def self.all_sorted
      self.all.sort_by(&:id).reverse
   end
end
 