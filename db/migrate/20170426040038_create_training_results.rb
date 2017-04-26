class CreateTrainingResults < ActiveRecord::Migration[5.0]
  def change
    create_table :training_results do |t|
      t.string :name
      t.integer :min_point
      t.integer :max_point
      t.integer :evaluation_template_id, index: true
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
