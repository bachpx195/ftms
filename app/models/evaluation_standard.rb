class EvaluationStandard < ApplicationRecord
  acts_as_paranoid

  ATTRIBUTE_PARAMS = [:name, :max_point, :min_point]

  belongs_to :evaluation_template
  belongs_to :creator, foreign_key: :creator_id, class_name: User.name

  has_many :member_evaluation_items, dependent: :destroy

  validates :name, presence: true
  validates :min_point, numericality: true
  validates :max_point, numericality: true
  validate :check_min_point

  private
  def check_min_point
    if min_point > max_point
      self.errors
        .add :min_point, I18n.t("evaluation_standards.errors.check_min_point")
    end
  end
end
