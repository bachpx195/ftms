class Team < ApplicationRecord
  acts_as_paranoid

  belongs_to :course_subject

  has_many :user_subjects, dependent: :destroy
end
