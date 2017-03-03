class CreateFunctions < ActiveRecord::Migration[5.0]
  def change
    create_table :functions do |t|
      t.string :humanize_name
      t.string :controller_name
      t.string :action
      t.integer :parent_id
      t.integer :row_order

      t.timestamps
    end
  end
end
