class MetaType < ApplicationRecord
  has_many :meta_type_relationships
  has_many :tasks, through: :meta_type_relationships, source: :objectable,
    source_type: Task.name
  has_many :assignments, through: :meta_type_relationships,
    source: :objectable, source_type: Assignment.name
end
