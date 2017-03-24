class CreateStandardOrganizations < ActiveRecord::Migration[5.0]
  def change
    create_table :standard_organizations do |t|
      t.integer :organization_id
      t.integer :training_standard_id

      t.timestamps
    end
  end
end
