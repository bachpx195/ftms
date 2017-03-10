class StandardOrganization < ApplicationRecord
  belongs_to :organization
  belongs_to :training_standard
end
