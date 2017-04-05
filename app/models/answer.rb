class Answer < ApplicationRecord
  belongs_to :question, dependent: :destroy

  has_many :results
end
