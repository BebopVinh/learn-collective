class AddSectionIdToLesson < ActiveRecord::Migration[5.2]
  def change
    add_column :lessons, :section_id, :integer
  end
end
