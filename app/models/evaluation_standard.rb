class EvaluationStandard < ApplicationRecord
  acts_as_paranoid

  ATTRIBUTE_PARAMS = [:name, :max_point, :min_point, :average_point]

  belongs_to :evaluation_template
  belongs_to :creator, foreign_key: :creator_id, class_name: User.name

  has_many :member_evaluation_items, dependent: :destroy

  validates :name, presence: true
  validates :min_point, presence: true, numericality: true
  validates :max_point, presence: true, numericality: true
  validates :average_point, presence: true
end
