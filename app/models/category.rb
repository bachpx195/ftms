class Category < ApplicationRecord
  ATTRIBUTE_PARAMS = [:name, :description]

  has_many :rule_categories
  has_many :questions
end
