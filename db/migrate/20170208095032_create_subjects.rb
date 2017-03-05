class CreateSubjects < ActiveRecord::Migration[5.0]
  def change
    create_table :subjects do |t|
      t.string :name
      t.string :image
      t.string :description
      t.text :content
      t.datetime :deleted_at
      t.integer :during_time

      t.timestamps
    end
  end
end
