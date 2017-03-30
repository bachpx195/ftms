class CreateRequirements < ActiveRecord::Migration[5.0]
  def change
    create_table :requirements do |t|
      t.text :name
      t.integer :priority
      t.integer :project_id, index: true
      t.integer :creator_id, index: true
      t.datetime :deleted_at
      t.timestamps
    end
  end
end
