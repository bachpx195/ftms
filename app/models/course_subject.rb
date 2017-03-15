class CourseSubject < ApplicationRecord
  acts_as_paranoid

  belongs_to :subject
  belongs_to :course

  has_many :user_subjects, dependent: :destroy
  has_many :course_subject_teams, dependent: :destroy
  has_many :dynamic_tasks, class_name: DynamicTask.name, dependent: :destroy

  has_many :owners, as: :ownerable,
    class_name: Task.name, dependent: :destroy
  has_many :targets, as: :targetable,
    class_name: Task.name, dependent: :destroy

  enum status: [:init, :in_progress, :finished]
end
