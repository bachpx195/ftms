class RuleCategory < ApplicationRecord
  belongs_to :test_rule
  belongs_to :category
end
