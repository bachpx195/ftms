class Survey < ApplicationRecord
  has_many :tasks, as: :targetable,
    class_name: StaticTask.name, dependent: :destroy
  has_many :subjects, through: :tasks, source: :targetable,
    source_type: Subject.name
  has_many :courses, through: :tasks, source: :targetable,
    source_type: Course.name
end
