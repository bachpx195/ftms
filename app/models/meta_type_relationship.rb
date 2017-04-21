class MetaTypeRelationship < ApplicationRecord
  belongs_to :meta_type
  belongs_to :objectable, polymorphic: true
end
