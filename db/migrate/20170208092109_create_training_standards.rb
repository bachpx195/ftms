class CreateTrainingStandards < ActiveRecord::Migration[5.0]
  def change
    create_table :training_standards do |t|
      t.string :name
      t.integer :organization_id
      t.integer :creator_id
      t.text :description
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
