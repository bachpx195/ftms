class CreateRules < ActiveRecord::Migration[5.0]
  def change
    create_table :rules do |t|
      t.string :name
      t.integer :total_question
      t.integer :time_of_test
      t.integer :min_score_for_pass
      t.integer :opportunity
      t.integer :number_of_test

      t.timestamps
    end
  end
end
