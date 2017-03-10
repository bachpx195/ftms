class CreateStandardPrograms < ActiveRecord::Migration[5.0]
  def change
    create_table :standard_programs do |t|
      t.belongs_to :program, foreign_key: true
      t.belongs_to :training_standard, foreign_key: true

      t.timestamps
    end
  end
end
