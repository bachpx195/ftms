class CreateUserPrograms < ActiveRecord::Migration[5.0]
  def change
    create_table :user_programs do |t|
      t.integer :program_id
      t.integer :user_id
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
