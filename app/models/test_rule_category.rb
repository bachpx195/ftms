class TestRuleCategory < ApplicationRecord
  belongs_to :test_rule
  belongs_to :category
end
