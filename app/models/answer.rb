class Answer < ApplicationRecord
  belongs_to :question, dependent: :destroy

  has_many :results

  validates :content, presence: true
end
