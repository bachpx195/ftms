class CreateTestRuleCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :test_rule_categories do |t|
      t.integer :test_rule_id, index: true
      t.integer :category_id, index: true
      t.integer :number_question
      t.integer :easy
      t.integer :normal
      t.integer :hard
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
