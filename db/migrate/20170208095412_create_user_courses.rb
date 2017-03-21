class CreateUserCourses < ActiveRecord::Migration[5.0]
  def change
    create_table :user_courses do |t|
      t.string :type
      t.integer :user_id
      t.integer :course_id
      t.integer :status, default: 0, null: false
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
