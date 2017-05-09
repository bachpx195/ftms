class Team < ApplicationRecord
  acts_as_paranoid

  ATTRIBUTE_PARAMS = [:name, :course_subject_id]

  belongs_to :course_subject
  belongs_to :creator, foreign_key: :creator_id, class_name: User.name

  has_one :course, through: :course_subject
  has_one :subject, through: :course_subject

  has_many :user_subjects, dependent: :destroy
  has_many :users, through: :user_subjects, source: :user
  has_many :documents, as: :documentable, dependent: :destroy
  has_many :static_tasks, as: :ownerable,
    class_name: StaticTask.name, dependent: :destroy
  has_many :assignments, through: :static_tasks, source: :targetable,
    source_type: Assignment.name
  has_many :surveys, through: :static_tasks, source: :targetable,
    source_type: Survey.name
  has_many :projects, through: :static_tasks, source: :targetable,
    source_type: Project.name
  has_many :test_rules, through: :static_tasks, source: :targetable,
    source_type: TestRule.name
end
