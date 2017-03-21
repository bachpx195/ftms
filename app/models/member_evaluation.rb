class MemberEvaluation < ApplicationRecord
  acts_as_paranoid

  ATTRIBUTE_PARAMS = [:member_id, :manager_id, :total_point,
    :evaluation_template_id, member_evaluation_items_attributes:
    [:id, :evaluation_point, :evaluation_standard_id]]

  belongs_to :targetable, polymorphic: true
  belongs_to :user
  belongs_to :evaluation_template

  has_many :member_evaluation_items, dependent: :destroy

  accepts_nested_attributes_for :member_evaluation_items, allow_destroy: true,
    reject_if: proc {|attributes| attributes[:evaluation_point].blank?}
end
