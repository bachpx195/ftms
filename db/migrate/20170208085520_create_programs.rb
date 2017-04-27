class CreatePrograms < ActiveRecord::Migration[5.0]
  def change
    create_table :programs do |t|
      t.string :name
      t.integer :program_type
      t.integer :parent_id
      t.integer :organization_id
      t.datetime :deleted_at
      t.integer :creator_id, index: true
      t.integer :owner_id, index: true

      t.timestamps
    end
  end
end
