class CreateShareWiths < ActiveRecord::Migration[5.0]
  def change
    create_table :share_withs do |t|
      t.integer :organization_id
      t.integer :training_standard_id

      t.timestamps
    end
  end
end
