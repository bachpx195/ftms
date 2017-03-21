class CreateMetaTasks < ActiveRecord::Migration[5.0]
  def change
    create_table :meta_tasks do |t|
      t.string :title
      t.text :value
      t.string :meta_type
      t.integer :dynamic_task_id

      t.timestamps
    end
  end
end
