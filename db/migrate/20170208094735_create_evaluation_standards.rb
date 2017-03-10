class CreateEvaluationStandards < ActiveRecord::Migration[5.0]
  def change
    create_table :evaluation_standards do |t|
      t.string :name
      t.float :max_point, default: 0
      t.float :min_point, default: 0
      t.float :average_point, default: 0
      t.belongs_to :evaluation_template, foreign_key: true
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
