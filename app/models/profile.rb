class Profile < ApplicationRecord
  acts_as_paranoid

  ATTRIBUTES_PARAMS = [:id, :user_id, :start_training_date, :leave_date,
    :finish_training_date, :ready_for_project, :contract_date, :naitei_company,
    :university_id, :graduation, :language_id, :trainee_type_id,
    :user_status_id, :stage_id, :organization_id, :working_day, :program_id,
    :staff_code, :division, :join_div_date]

  belongs_to :user
  belongs_to :trainee, class_name: User.name, foreign_key: :user_id
  belongs_to :university
  belongs_to :language
  belongs_to :trainee_type
  belongs_to :user_status
  belongs_to :stage
  belongs_to :organization
  belongs_to :program
end
