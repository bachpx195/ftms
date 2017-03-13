class CreateUserFunctions < ActiveRecord::Migration[5.0]
  def change
    create_table :user_functions do |t|
      t.belongs_to :user, foreign_key: true
      t.belongs_to :function, foreign_key: true

      t.timestamps
    end
  end
end
