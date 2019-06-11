class CreateCategoriesAndSections < ActiveRecord::Migration[5.2]
  def change
    create_table :categories do |t|
      t.string :name
    end
    create_table :sections do |t|
      t.string :name
      t.integer :category_id
    end
  end
end
