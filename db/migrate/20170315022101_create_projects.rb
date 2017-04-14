class CreateProjects < ActiveRecord::Migration[5.0]
  def change
    create_table :projects do |t|
      t.string :name
      t.string :description
      t.integer :organization_id, index: true
      t.integer :course_subject_id, index:true
      t.integer :task_id, index: true
      t.integer :creator_id, index: true
      t.datetime :deleted_at
      t.timestamps
    end
  end
end
