class CreateQuestions < ActiveRecord::Migration[5.0]
  def change
    create_table :questions do |t|
      t.integer :category_id
      t.string :content
      t.integer :level
      t.integer :type

      t.timestamps
    end
  end
end
