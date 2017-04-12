class Category < ApplicationRecord
  acts_as_paranoid

  ATTRIBUTE_PARAMS = [:name, :description]

  has_many :test_rule_categories
  has_many :questions
end
