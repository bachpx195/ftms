class CreateQuestions < ActiveRecord::Migration[5.0]
  def change
    create_table :questions do |t|
      t.integer :category_id
      t.string :content
      t.integer :level
      t.integer :question_type
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
