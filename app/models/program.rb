class Program < ApplicationRecord
  acts_as_paranoid
  acts_as_tree order: "created_at DESC", dependent: :destroy

  ATTRIBUTE_PARAMS = [:name, :program_type, :organization_id, :parent_id]

  belongs_to :organization

  has_many :courses, dependent: :destroy
  has_many :profiles, dependent: :destroy
  has_many :training_standards, dependent: :destroy
  has_many :program_subjects, through: :training_standards, source: :subjects
  has_many :user_programs, dependent: :destroy
  has_many :users, through: :user_programs, source: :user
  has_many :sources, as: :sourceable,
    class_name: MovingHistory.name, dependent: :destroy
  has_many :destinations, as: :destinationable,
    class_name: MovingHistory.name, dependent: :destroy
end
