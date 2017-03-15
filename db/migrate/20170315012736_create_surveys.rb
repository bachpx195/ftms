class CreateSurveys < ActiveRecord::Migration[5.0]
  def change
    create_table :surveys do |t|
      t.text :name
      t.integer :subject_id, index: true
      t.integer :task_id, index: true
      t.timestamps
    end
  end
end
