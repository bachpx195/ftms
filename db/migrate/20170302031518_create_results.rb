class CreateResults < ActiveRecord::Migration[5.0]
  def change
    create_table :results do |t|
      t.integer :exam_id
      t.integer :question_id
      t.integer :answer_id
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
