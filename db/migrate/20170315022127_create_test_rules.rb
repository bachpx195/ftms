class CreateTestRules < ActiveRecord::Migration[5.0]
  def change
    create_table :test_rules do |t|
      t.string :name
      t.integer :organization_id, index: true
      t.timestamps
    end
  end
end
