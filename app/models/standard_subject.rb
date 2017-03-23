class StandardSubject < ApplicationRecord
  acts_as_paranoid

  belongs_to :subject
  belongs_to :training_standard

  validates :training_standard, presence: true
  validates :subject, presence: true
end
