class MemberEvaluationItem < ApplicationRecord
  belongs_to :member_evaluation
  belongs_to :evaluation_standard
end
