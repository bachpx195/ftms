class CreateMemberEvaluations < ActiveRecord::Migration[5.0]
  def change
    create_table :member_evaluations do |t|
      t.integer :manager_id
      t.integer :member_id
      t.float :total_point
      t.integer :targetable_id
      t.string :targetable_type
      t.integer :evaluation_template_id
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
