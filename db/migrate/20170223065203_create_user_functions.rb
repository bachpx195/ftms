class CreateUserFunctions < ActiveRecord::Migration[5.0]
  def change
    create_table :user_functions do |t|
      t.integer :user_id
      t.integer :function_id

      t.timestamps
    end
  end
end
