class CreateExams < ActiveRecord::Migration[5.0]
  def change
    create_table :exams do |t|
      t.integer :status
      t.integer :spend_time
      t.datetime :started_at
      t.integer :score
      t.integer :duration
      t.integer :course_subject_id
      t.integer :course_id
      t.integer :user_id
      t.integer :test_rule_id
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
