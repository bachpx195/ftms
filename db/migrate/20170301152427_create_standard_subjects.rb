class CreateStandardSubjects < ActiveRecord::Migration[5.0]
  def change
    create_table :standard_subjects do |t|
      t.integer :subject_id
      t.integer :training_standard_id
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
