class CreateMetaTypeRelationships < ActiveRecord::Migration[5.0]
  def change
    create_table :meta_type_relationships do |t|
      t.integer :meta_type_id
      t.integer :objectable_id
      t.string :objectable_type
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
