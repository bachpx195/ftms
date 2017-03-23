class Assignment < ApplicationRecord
  has_many :static_tasks, as: :targetable,
    class_name: StaticTask.name, dependent: :destroy
  has_many :subjects, through: :tasks, source: :targetable,
    source_type: Subject.name
  has_many :course_subjects, through: :tasks, source: :targetable,
    source_type: CourseSubject.name

  belongs_to :organization
end
