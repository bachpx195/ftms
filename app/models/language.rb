class Language < ApplicationRecord
  acts_as_paranoid

  ATTRIBUTE_PARAMS = [:name]

  has_many :courses, dependent: :destroy
  has_many :profiles, dependent: :destroy

  validates :name, presence: true
end
