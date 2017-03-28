class Organization < ApplicationRecord
  acts_as_paranoid
  acts_as_tree order: "created_at DESC", dependent: :destroy

  ATTRIBUTES_PARAMS = [:name, :parent_id]

  belongs_to :owner, class_name: User.name, foreign_key: :user_id

  has_many :profiles, dependent: :destroy
  has_many :users, through: :profiles
  has_many :programs, dependent: :destroy
  has_many :standard_organizations, dependent: :destroy
  has_many :training_standards, through: :standard_organizations,
    source: :training_standard
  has_many :surveys, dependent: :destroy
  has_many :test_rules, dependent: :destroy
  has_many :assignments, dependent: :destroy
  has_many :subjects, dependent: :destroy
  has_many :projects, dependent: :destroy

  validates :name, presence: true

  def assign_programs program_ids
    self.program_ids = self.program_ids + program_ids
  end
end
