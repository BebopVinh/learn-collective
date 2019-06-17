class ContributionSerializer < ActiveModel::Serializer
  include ContributionsHelper
  
  attributes :id, :parsed_content
  belongs_to :lesson
  belongs_to :user


  def parsed_content
    parse_content(self.object.content)
  end
end
