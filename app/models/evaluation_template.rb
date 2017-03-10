class EvaluationTemplate < ApplicationRecord
  acts_as_paranoid

  ATTRIBUTE_PARAMS = [:name]

  belongs_to :training_standard

  has_many :evaluation_standards, dependent: :destroy

  validates :name, presence: true
end
