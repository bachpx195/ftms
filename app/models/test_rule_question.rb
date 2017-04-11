class TestRuleQuestion < ApplicationRecord
  belongs_to :test_rule
  belongs_to :question
end
