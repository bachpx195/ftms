class CreateTestRuleQuestions < ActiveRecord::Migration[5.0]
  def change
    create_table :test_rule_questions do |t|
      t.integer :test_rule_id, index: true
      t.integer :question_id, index: true
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
