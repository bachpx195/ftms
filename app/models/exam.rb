class Exam < ApplicationRecord
  acts_as_paranoid

  ATTRIBUTE_PARAMS = [:id, :status, :spent_time, :started_at, :score, :duration,
    :course_subject_id, :course_id, :user_id, :test_rule_id,
    results_attributes: [:id, :question_id, :answer_id]]

  belongs_to :test_rule
  belongs_to :user
  belongs_to :course
  belongs_to :course_subject

  has_many :results, dependent: :destroy

  accepts_nested_attributes_for :results
end
