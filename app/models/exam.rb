class Exam < ApplicationRecord
  acts_as_paranoid

  belongs_to :test_rule
  belongs_to :user
  belongs_to :course
  belongs_to :course_subject

  has_many :results, dependent: :destroy
end
