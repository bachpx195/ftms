class RuleQuestion < ApplicationRecord
  has_many :questions

  belongs_to :rule
end
