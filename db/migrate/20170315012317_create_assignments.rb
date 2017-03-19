class CreateAssignments < ActiveRecord::Migration[5.0]
  def change
    create_table :assignments do |t|
      t.text :name
      t.integer :organization_id, index: true
      t.timestamps
    end
  end
end
