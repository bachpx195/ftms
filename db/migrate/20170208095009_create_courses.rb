class CreateCourses < ActiveRecord::Migration[5.0]
  def change
    create_table :courses do |t|
      t.string :name
      t.string :image
      t.string :description
      t.integer :status, default: 0, null: false
      t.integer :language_id
      t.date :start_date
      t.date :end_date
      t.integer :creator_id
      t.integer :program_id
      t.integer :training_standard_id
      t.datetime :deleted_at
      t.integer :creator_id
      t.integer :owner_id

      t.timestamps
    end
  end
end
