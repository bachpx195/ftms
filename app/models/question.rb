class Question < ApplicationRecord
  acts_as_paranoid

  belongs_to :category, dependent: :destroy
  belongs_to :test_rule_question

  has_many :answers
  has_many :results
end
