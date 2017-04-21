class UserSubject < ApplicationRecord
  acts_as_paranoid

  belongs_to :user
  belongs_to :user_course
  belongs_to :course_subject
  belongs_to :subject
  belongs_to :team

  has_many :tasks, as: :ownerable,
    class_name: DynamicTask.name, dependent: :destroy
  has_many :static_tasks, through: :tasks, source: :targetable,
    source_type: StaticTask.name
  has_many :dynamic_surveys, through: :static_tasks, source: :targetable,
    source_type: Survey.name
  has_many :dynamic_assignments, through: :static_tasks, source: :targetable,
    source_type: Assignment.name
  has_many :dynamic_projects, through: :static_tasks, source: :targetable,
    source_type: Project.name
  has_many :dynamic_test_rules, through: :static_tasks, source: :targetable,
    source_type: TestRule.name

  enum status: [:init, :in_progress, :finished, :reject]

  %w(assignments projects surveys test_rules).each do |task|
    define_method task do
      tasks = DynamicTask.where ownerable: course_subject,
        user_id: self.user_id,
        targetable: StaticTask.where(targetable_type: task.classify)
      tasks.map{|task| task.targetable.targetable}
    end
  end
end
