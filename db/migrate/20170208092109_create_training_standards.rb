class CreateTrainingStandards < ActiveRecord::Migration[5.0]
  def change
    create_table :training_standards do |t|
      t.string :name
      t.integer :creator_id, index: true
      t.text :description
      t.datetime :deleted_at
      t.integer :policy, default: 0
      t.integer :organization_id, index: true

      t.timestamps
    end
  end
end
