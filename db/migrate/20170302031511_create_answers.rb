class CreateAnswers < ActiveRecord::Migration[5.0]
  def change
    create_table :answers do |t|
      t.integer :question_id
      t.string :content
      t.boolean :is_correct, default: false
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
