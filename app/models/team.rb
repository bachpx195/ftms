class Team < ApplicationRecord
  acts_as_paranoid

  ATTRIBUTE_PARAMS = [:name, :course_subject_id]

  belongs_to :course_subject

  has_many :user_subjects, dependent: :destroy
end
