class TrainingStandard < ApplicationRecord
  acts_as_paranoid

  belongs_to :program
  belongs_to :user, foreign_key: :creator_id

  has_one :evaluation_template, dependent: :destroy

  has_many :courses, dependent: :destroy
  has_many :subjects, through: :standard_subjects, dependent: :destroy
  has_many :standard_subjects, dependent: :destroy
  has_many :standard_organizations, dependent: :destroy

  validates :name, presence: true

  ATTRIBUTE_PARAMS = [:name, :description, :program_id, :creator_id, :organization_id]
end
