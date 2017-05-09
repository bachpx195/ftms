class CourseSubject < ApplicationRecord
  acts_as_paranoid

  belongs_to :subject
  belongs_to :course

  has_many :user_subjects, dependent: :destroy
  has_many :teams, dependent: :destroy
  has_many :dynamic_tasks, as: :ownerable,
    class_name: DynamicTask.name, dependent: :destroy
  has_many :dynamic_assignments, through: :dynamic_tasks, source: :targetable,
    source_type: Assignment.name
  has_many :dynamic_surveys, through: :dynamic_tasks, source: :targetable,
    source_type: Survey.name
  has_many :dynamic_projects, through: :dynamic_tasks, source: :targetable,
    source_type: Project.name
  has_many :dynamic_test_rules, through: :dynamic_tasks, source: :targetable,
    source_type: TestRule.name
  has_many :member_evaluations, as: :targetable, dependent: :destroy

  has_many :static_tasks, as: :ownerable,
    class_name: StaticTask.name, dependent: :destroy
  has_many :static_assignments, through: :static_tasks, source: :targetable,
    source_type: Assignment.name
  has_many :static_surveys, through: :static_tasks, source: :targetable,
    source_type: Survey.name
  has_many :static_projects, through: :static_tasks, source: :targetable,
    source_type: Project.name
  has_many :static_test_rules, through: :static_tasks, source: :targetable,
    source_type: TestRule.name

  has_many :tasks, as: :ownerable, class_name: Task.name, dependent: :destroy
  has_many :projects, through: :tasks, source: :targetable,
    source_type: Project.name
  has_many :team_projects, through: :teams, source: :projects
  has_many :member_evaluations, as: :targetable, dependent: :destroy
  has_many :team_users, through: :teams, source: :users
  has_many :exams, dependent: :destroy

  enum status: [:init, :in_progress, :finished]

  def unassigned_user_subjects
    user_subjects.where(team_id: nil).where.not status: "rejected"
  end
end
