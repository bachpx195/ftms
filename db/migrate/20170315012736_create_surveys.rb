class CreateSurveys < ActiveRecord::Migration[5.0]
  def change
    create_table :surveys do |t|
      t.text :name
      t.text :content
      t.integer :organization_id, index: true
      t.integer :creator_id, index: true
      t.timestamps
    end
  end
end
