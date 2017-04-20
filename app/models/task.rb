class Task < ApplicationRecord
  acts_as_paranoid

  belongs_to :targetable, polymorphic: true
  belongs_to :ownerable, polymorphic: true

  has_many :meta_type_relationships, as: :objectable
  has_many :meta_types, through: :meta_type_relationships
end
