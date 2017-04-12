class CreateCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :categories do |t|
      t.string :name
      t.string :description
      t.integer :creator_id
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
