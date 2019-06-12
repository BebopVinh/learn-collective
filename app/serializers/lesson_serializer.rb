class LessonSerializer < ActiveModel::Serializer
  attributes :id, :name
  belongs_to :section
  has_many :contributions
end
