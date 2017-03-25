class CreateStandardPrograms < ActiveRecord::Migration[5.0]
  def change
    create_table :standard_programs do |t|
      t.integer :program_id
      t.integer :training_standard_id

      t.timestamps
    end
  end
end
