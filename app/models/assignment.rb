class Assignment < ApplicationRecord
  has_many :tasks, as: :targetable,
    class_name: StaticTask.name, dependent: :destroy
  has_many :subjects, through: :tasks, source: :targetable,
    source_type: Subject.name
  has_many :course_subjects, through: :tasks, source: :targetable,
    source_type: CourseSubject.name
end
