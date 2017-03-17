class Project < ApplicationRecord
  has_many :requirements, dependent: :destroy
  has_many :tasks, as: :targetable,
    class_name: StaticTask.name, dependent: :destroy
  has_many :subjects, through: :tasks, source: :targetable,
    source_type: Subject.name
end
