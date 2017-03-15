class CreateTasks < ActiveRecord::Migration[5.0]
  def change
    create_table :tasks do |t|
      t.belongs_to :targettiable, polymorphic: true
      t.belongs_to :ownerable, polymorphic: true
      t.belongs_to :user, foreign_key: true
      t.integer :status
      t.string :type
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
