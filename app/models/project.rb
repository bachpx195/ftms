class Project < ApplicationRecord
  has_many :requirements, dependent: :destroy
  has_many :static_tasks, as: :targetable,
    class_name: StaticTask.name, dependent: :destroy
  has_many :course_subjects, through: :static_tasks, source: :targetable,
    source_type: CourseSubject.name
  belongs_to :organization
  belongs_to :creator, foreign_key: :creator_id, class_name: User.name

  has_many :dynamic_tasks, through: :static_tasks, class_name: DynamicTask.name
  has_many :tasks, as: :targetable, class_name: Task.name, dependent: :destroy
  has_many :course_subjects, through: :tasks, source: :targetable,
    source_type: Project.name
end
