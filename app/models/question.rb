class Question < ApplicationRecord
  acts_as_paranoid

  ATTRIBUTE_PARAMS = [:content, answers_attributes: [:content, :is_correct]]

  enum level: [:easy, :normal, :hard]

  belongs_to :category
  has_many :test_rule_questions, dependent: :destroy

  has_many :answers, dependent: :destroy
  has_many :results, dependent: :destroy

  accepts_nested_attributes_for :answers

  validates :content, presence: true

  enum level: [:easy, :normal, :hard]
end
