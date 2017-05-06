class EvaluationTemplate < ApplicationRecord
  acts_as_paranoid

  ATTRIBUTE_PARAMS = [:id, :name, :training_standard_id,
    evaluation_standards_attributes: EvaluationStandard::ATTRIBUTE_PARAMS,
    training_results_attributes: TrainingResult::ATTRIBUTE_PARAMS]

  belongs_to :creator, foreign_key: :creator_id, class_name: User.name
  belongs_to :training_standard

  has_many :evaluation_standards, dependent: :destroy
  has_many :member_evaluations, dependent: :destroy
  has_many :training_results, dependent: :destroy

  accepts_nested_attributes_for :evaluation_standards, allow_destroy: true,
    reject_if: proc{|attributes| attributes[:name].blank?}
  accepts_nested_attributes_for :training_results, allow_destroy: true,
    reject_if: proc{|attributes| attributes[:name].blank?}

  validates :name, presence: true
end
