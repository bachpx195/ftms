class Question < ApplicationRecord
  acts_as_paranoid

  ATTRIBUTE_PARAMS = [:content, answers_attributes: [:content, :is_correct]]

  belongs_to :category
  belongs_to :test_rule_question

  has_many :answers, dependent: :destroy
  has_many :results, dependent: :destroy

  accepts_nested_attributes_for :answers

  validates :content, presence: true
end
