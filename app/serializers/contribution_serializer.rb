class ContributionSerializer < ActiveModel::Serializer
  attributes :id, :content
  belongs_to :lesson
  belongs_to :user
end
