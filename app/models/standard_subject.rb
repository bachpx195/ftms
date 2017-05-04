class StandardSubject < ApplicationRecord
  acts_as_paranoid

  ATTRIBUTE_PARAMS = [:id, :subject_id, :training_standard_id]

  belongs_to :subject
  belongs_to :training_standard

  validates :subject, presence: true
end
