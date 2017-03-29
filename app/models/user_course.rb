class UserCourse < ApplicationRecord
  acts_as_paranoid

  belongs_to :user
  belongs_to :course

  has_many :user_subjects, dependent: :destroy

  enum status: [:init, :in_progress, :finished]
end
