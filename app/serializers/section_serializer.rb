class SectionSerializer < ActiveModel::Serializer
  attributes :id, :name
  belongs_to :category
  has_many :lessons
end
