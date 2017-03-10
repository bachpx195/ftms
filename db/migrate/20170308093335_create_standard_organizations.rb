class CreateStandardOrganizations < ActiveRecord::Migration[5.0]
  def change
    create_table :standard_organizations do |t|
      t.belongs_to :organization, foreign_key: true
      t.belongs_to :training_standard, foreign_key: true

      t.timestamps
    end
  end
end
