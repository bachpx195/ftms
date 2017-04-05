class CreateExams < ActiveRecord::Migration[5.0]
  def change
    create_table :exams do |t|
      t.integer :status
      t.integer :spend_time
      t.datetime :started_at
      t.integer :score
      t.integer :duration
      
      t.timestamps
    end
  end
end
