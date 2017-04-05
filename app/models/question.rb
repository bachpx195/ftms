class Question < ApplicationRecord
  belongs_to :category, dependent: :destroy
  belongs_to :rule_question

  has_many :answers
  has_many :results
end
