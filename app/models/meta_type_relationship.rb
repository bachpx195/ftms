class MetaTypeRelationship < ApplicationRecord
  acts_as_paranoid

  belongs_to :meta_type
  belongs_to :objectable, polymorphic: true
end
