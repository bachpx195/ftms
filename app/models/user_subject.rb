class UserSubject < ApplicationRecord
  acts_as_paranoid

  belongs_to :user
  belongs_to :user_course
  belongs_to :course_subject
  belongs_to :subject

  has_many :dynamic_tasks, class_name: DynamicTask.name, dependent: :destroy

  has_many :owners, as: :ownerable,
    class_name: Task.name, dependent: :destroy
  has_many :targets, as: :targetable,
    class_name: Task.name, dependent: :destroy

  enum status: [:init, :in_progress, :waiting, :finished]
end
