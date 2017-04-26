class MetaType < ApplicationRecord
  acts_as_paranoid

  has_many :meta_type_relationships, dependent: :destroy
  has_many :tasks, through: :meta_type_relationships, source: :objectable,
    source_type: Task.name
  has_many :assignments, through: :meta_type_relationships,
    source: :objectable, source_type: Assignment.name

  belongs_to :organization
end
