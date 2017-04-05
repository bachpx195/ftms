class CreateRuleCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :rule_categories do |t|
      t.integer :rule_id
      t.integer :category_id
      t.integer :number_question
      t.integer :easy
      t.integer :normal
      t.integer :hard

      t.timestamps
    end

    add_index :rule_categories, :rule_id
    add_index :rule_categories, :category_id
  end
end
