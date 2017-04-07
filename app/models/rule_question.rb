class RuleQuestion < ApplicationRecord
  has_many :questions

  belongs_to :test_rule
end
