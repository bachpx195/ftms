class UserSubject < ApplicationRecord
  acts_as_paranoid

  belongs_to :user
  belongs_to :user_course
  belongs_to :course_subject
  belongs_to :subject

  has_many :tasks, as: :ownerable,
    class_name: DynamicTask.name, dependent: :destroy
  has_many :assignments, through: :tasks, source: :targetable,
    source_type: Assignment.name
  has_many :surveys, through: :tasks, source: :targetable,
    source_type: Survey.name
  has_many :projects, through: :tasks, source: :targetable,
    source_type: Project.name
  has_many :test_rules, through: :tasks, source: :targetable,
    source_type: TestRule.name

  enum status: [:init, :in_progress, :waiting, :finished]
end
