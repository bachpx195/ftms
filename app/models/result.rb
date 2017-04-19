class Result < ApplicationRecord
  belongs_to :exam
  belongs_to :question
  belongs_to :answer, optional: true

  scope :questions, lambda{all.map(&:question)}

  class << self
    def score
      joins(:answer).where(answers: {is_correct: true}).count
    end

    def check_answer
      pluck(:answer_id).reject(&:nil?).present?
    end
  end
end
