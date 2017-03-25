class CreateEvaluationTemplates < ActiveRecord::Migration[5.0]
  def change
    create_table :evaluation_templates do |t|
      t.string :name
      t.integer :training_standard_id
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
