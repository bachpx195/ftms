class CreateMovingHistories < ActiveRecord::Migration[5.0]
  def change
    create_table :moving_histories do |t|
      t.integer :user_id
      t.integer :sourceable_id
      t.string :sourceable_type
      t.integer :destinationable_id
      t.string :destinationable_type
      t.date :move_date
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
