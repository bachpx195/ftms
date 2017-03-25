class CreateProfiles < ActiveRecord::Migration[5.0]
  def change
    create_table :profiles do |t|
      t.integer :user_id
      t.date :start_training_date
      t.date :leave_date
      t.date :finish_training_date
      t.boolean :ready_for_project
      t.date :contract_date
      t.string :naitei_company
      t.integer :university_id
      t.date :graduation
      t.integer :language_id
      t.integer :trainee_type_id
      t.integer :user_status_id
      t.integer :stage_id
      t.integer :organization_id
      t.float :working_day
      t.integer :program_id
      t.string :staff_code
      t.integer :division
      t.date :join_div_date
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
