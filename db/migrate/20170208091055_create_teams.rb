class CreateTeams < ActiveRecord::Migration[5.0]
  def change
    create_table :teams do |t|
      t.string :name
      t.integer :course_subject_id
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
