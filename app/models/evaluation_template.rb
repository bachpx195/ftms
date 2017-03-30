class EvaluationTemplate < ApplicationRecord
  acts_as_paranoid

  ATTRIBUTE_PARAMS = [:name, evaluation_standards_attributes: [:id,
    :name, :max_point, :min_point, :average_point]]

  belongs_to :training_standard
  belongs_to :creator, foreign_key: :creator_id, class_name: User.name

  has_many :evaluation_standards, dependent: :destroy
  has_many :member_evaluations, dependent: :destroy

  accepts_nested_attributes_for :evaluation_standards
  validates :name, presence: true
end
