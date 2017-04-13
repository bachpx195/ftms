class TestRuleQuestion < ApplicationRecord
  has_many :questions, dependent: :destroy

  belongs_to :test_rule
end
