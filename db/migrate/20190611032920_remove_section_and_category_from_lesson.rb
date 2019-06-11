class RemoveSectionAndCategoryFromLesson < ActiveRecord::Migration[5.2]
  def change
    remove_column :lessons, :category
    remove_column :lessons, :section
  end
end
