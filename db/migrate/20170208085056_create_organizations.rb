class CreateOrganizations < ActiveRecord::Migration[5.0]
  def change
    create_table :organizations do |t|
      t.string :name
      t.integer :parent_id
      t.integer :user_id
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
