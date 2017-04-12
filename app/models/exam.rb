class Exam < ApplicationRecord
  acts_as_paranoid

  has_many :results, dependent: :destroy

  belongs_to :test_rule
end
