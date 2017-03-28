class Profile < ApplicationRecord
  acts_as_paranoid

  belongs_to :user
  belongs_to :trainee, class_name: User.name, foreign_key: :user_id
  belongs_to :university
  belongs_to :language
  belongs_to :trainee_type
  belongs_to :user_status
  belongs_to :stage
  belongs_to :organization
  belongs_to :program

  accepts_nested_attributes_for :user

  ATTRIBUTE_PARAMS = [:user_id, :star_training, :leave_date,
    :finish_training_date, :ready_for_project, :contract_date, :naitei_company,
    :university_id, :graduation, :language_id, :trainee_type_id,
    :user_status_id, :stage_id, :organization_id, :working_day, :program_id,
    :staff_code, :division, :join_div_date]

  CHANGE_PROFILE_PARAMS = [:organization_id, :program_id,
    user_attributes: [:id, :name, :email, :avatar]]
end
