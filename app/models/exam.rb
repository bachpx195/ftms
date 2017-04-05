class Exam < ApplicationRecord
  has_many :results

  belongs_to :rule
end
