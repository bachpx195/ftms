class Survey < ApplicationRecord
  ATTRIBUTE_PARAMS = [:id, :name, :content]

  has_many :static_tasks, as: :targetable,
    class_name: StaticTask.name, dependent: :destroy
  has_many :subjects, through: :tasks, source: :targetable,
    source_type: Subject.name
  has_many :courses, through: :tasks, source: :targetable,
    source_type: Course.name

  has_many :dynamic_tasks, through: :static_tasks, class_name: DynamicTask.name

  belongs_to :organization
  belongs_to :creator, foreign_key: :creator_id, class_name: User.name
end
