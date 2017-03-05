class CreateStandardSubjects < ActiveRecord::Migration[5.0]
  def change
    create_table :standard_subjects do |t|
      t.belongs_to :subject, foreign_key: true
      t.belongs_to :training_standard, foreign_key: true

      t.datetime :deleted_at
      t.timestamps
    end
  end
end
