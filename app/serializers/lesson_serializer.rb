class LessonSerializer < ActiveModel::Serializer
  attributes :id, :name, :creator_id
  belongs_to :section
  has_many :contributions
end
