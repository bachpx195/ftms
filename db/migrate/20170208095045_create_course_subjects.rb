class CreateCourseSubjects < ActiveRecord::Migration[5.0]
  def change
    create_table :course_subjects do |t|
      t.integer :subject_id
      t.string :subject_name
      t.string :subject_description
      t.text :subject_content
      t.string :subject_image
      t.integer :course_id
      t.string :github_link
      t.string :heroku_link
      t.string :redmine_link
      t.datetime :deleted_at
      t.integer :status, default: 0, null: false

      t.timestamps
    end
  end
end
