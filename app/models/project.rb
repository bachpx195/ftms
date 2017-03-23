class Project < ApplicationRecord
  has_many :requirements, dependent: :destroy
  has_many :tasks, as: :targetable,
    class_name: StaticTask.name, dependent: :destroy
  has_many :course_subjects, through: :tasks, source: :targetable,
    source_type: CourseSubject.name
  belongs_to :organization
end
