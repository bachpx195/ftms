class Assignment < ApplicationRecord
  has_many :static_tasks, as: :targetable,
    class_name: StaticTask.name, dependent: :destroy
  has_many :subjects, through: :tasks, source: :targetable,
    source_type: Subject.name
  has_many :course_subjects, through: :tasks, source: :targetable,
    source_type: CourseSubject.name
  has_many :dynamic_tasks, through: :static_tasks, source: :dynamic_tasks,
    class_name: DynamicTask.name

  belongs_to :organization
  belongs_to :creator, foreign_key: :creator_id, class_name: User.name

  ATTRIBUTE_PARAMS = [:name, :content]
end
