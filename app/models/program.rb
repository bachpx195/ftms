class Program < ApplicationRecord
  acts_as_paranoid
  acts_as_tree order: "created_at DESC", dependent: :destroy

  ATTRIBUTE_PARAMS = [:name, :program_type, :organization_id, :parent_id]

  belongs_to :organization
  belongs_to :creator, foreign_key: :creator_id, class_name: User.name

  has_many :courses, dependent: :destroy
  has_many :profiles, dependent: :destroy
  has_many :training_standards, through: :courses

  has_many :program_subjects, through: :training_standards, source: :subjects

  has_many :user_programs, dependent: :destroy
  has_many :users, through: :user_programs
  has_many :documents, as: :documentable, dependent: :destroy

  has_many :sources, as: :sourceable,
    class_name: MovingHistory.name, dependent: :destroy
  has_many :destinations, as: :destinationable,
    class_name: MovingHistory.name, dependent: :destroy

  scope :not_assigned_programs, ->{where organization_id: nil}
  scope :not_parent, ->{where parent_id: nil}
  enum program_type: {internal_training: 1, open_education: 2}

  validates :name, presence: true
end
