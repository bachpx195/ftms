class CreateRuleQuestions < ActiveRecord::Migration[5.0]
  def change
    create_table :rule_questions do |t|
      t.integer :rule_id
      t.integer :question_id
      t.timestamps
    end

    add_index :rule_questions, :rule_id
    add_index :rule_questions, :question_id
  end
end
