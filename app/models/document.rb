class Document < ApplicationRecord
  belongs_to :documentable, polymorphic: true
  mount_uploader :file, DocumentUploader

  ATTRIBUTE_PARAMS = [:file, :documentable_id, :documentable_type]
end
