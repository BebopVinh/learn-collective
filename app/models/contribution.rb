class Contribution < ActiveRecord::Base
   belongs_to :user
   belongs_to :lesson
   scope :order_by_name, -> (user) {where(user: user).joins(:lesson).order(:name)}

   validates :content, presence: true

end
