class Category < ApplicationRecord
  has_many :rule_categories
  has_many :questions
end
