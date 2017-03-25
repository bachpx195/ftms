class CreateEvaluationStandards < ActiveRecord::Migration[5.0]
  def change
    create_table :evaluation_standards do |t|
      t.string :name
      t.integer :max_point, default: 0
      t.integer :min_point, default: 0
      t.integer :average_point, default: 0
      t.integer :evaluation_template_id
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
