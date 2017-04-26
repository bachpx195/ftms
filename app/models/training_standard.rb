class TrainingStandard < ApplicationRecord
  acts_as_paranoid

  ATTRIBUTE_PARAMS = [:name, :description, :program_id, :creator_id,
    :organization_id, :policy]

  enum policy: [:publiced, :privated]

  belongs_to :user, foreign_key: :creator_id
  belongs_to :organization

  has_one :evaluation_template, dependent: :destroy

  has_many :courses, dependent: :destroy
  has_many :standard_subjects, dependent: :destroy
  has_many :subjects, through: :standard_subjects
  has_many :share_withs, dependent: :destroy
  has_many :shared_organizations, through: :share_withs,
    source: :organization
  has_many :programs, through: :courses
  has_many :training_results, through: :evaluation_template

  validates :name, presence: true
end
