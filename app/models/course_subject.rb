class CourseSubject < ApplicationRecord
  acts_as_paranoid

  belongs_to :subject
  belongs_to :course

  has_many :user_subjects, dependent: :destroy
  has_many :course_subject_teams, dependent: :destroy

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

  enum status: [:init, :in_progress, :finished]
end
