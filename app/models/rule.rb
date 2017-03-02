class Rule < ApplicationRecord
  has_many :rule_questions
  has_many :rule_categories
  has_many :exams

  has_many :static_tasks, as: :targetable,
    class_name: StaticTask.name, dependent: :destroy
  has_many :subjects, through: :tasks, source: :targetable,
    source_type: Subject.name
  has_many :course_subjects, through: :tasks, source: :targetable,
    source_type: CourseSubject.name
  has_many :dynamic_tasks, through: :static_tasks, class_name: DynamicTask.name
end
