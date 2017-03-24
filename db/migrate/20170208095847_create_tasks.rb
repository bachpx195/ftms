class CreateTasks < ActiveRecord::Migration[5.0]
  def change
    create_table :tasks do |t|
      t.integer :targetable_id
      t.string :targetable_type
      t.integer :ownerable_id
      t.string :ownerable_type
      t.integer :user_id
      t.integer :status
      t.string :type
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
