class EvaluationTemplate < ApplicationRecord
  acts_as_paranoid

  ATTRIBUTE_PARAMS = [:name, evaluation_standards_attributes: [:id,
    :name, :max_point, :min_point, :average_point]]

  belongs_to :training_standard

  has_many :evaluation_standards, dependent: :destroy

  accepts_nested_attributes_for :evaluation_standards
  validates :name, presence: true
end
