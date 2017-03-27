class CreateUserSubjects < ActiveRecord::Migration[5.0]
  def change
    create_table :user_subjects do |t|
      t.integer :user_id
      t.integer :status, default: 0, null: false
      t.integer :user_course_id
      t.integer :course_subject_id
      t.boolean :current_progress
      t.date :user_end_date
      t.date :start_date
      t.date :end_date
      t.integer :subject_id
      t.integer :team_id
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
