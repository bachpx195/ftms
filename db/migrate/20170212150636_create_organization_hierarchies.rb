class CreateOrganizationHierarchies < ActiveRecord::Migration[5.0]
  def change
    create_table :organization_hierarchies do |t|
      t.integer :ancestor_id, null: false
      t.integer :descendant_id, null: false
      t.integer :generations, null: false
    end
  end
end
