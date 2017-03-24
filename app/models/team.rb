class Team < ApplicationRecord
  acts_as_paranoid

  belongs_to :course_subject

  has_many :team_members, dependent: :destroy
  has_many :members, through: :team_members, source: :user
  has_many :user_subjects, through: :members
end
