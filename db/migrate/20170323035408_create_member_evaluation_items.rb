class CreateMemberEvaluationItems < ActiveRecord::Migration[5.0]
  def change
    create_table :member_evaluation_items do |t|
      t.integer :evaluation_point
      t.integer :member_evaluation_id
      t.integer :evaluation_standard_id
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
