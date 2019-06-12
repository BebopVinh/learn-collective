class SectionSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :lessons
  belongs_to :category
end
