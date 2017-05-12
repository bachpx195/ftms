class Organization < ApplicationRecord
  acts_as_paranoid
  acts_as_tree order: "created_at DESC", dependent: :destroy

  ATTRIBUTES_PARAMS = [:name, :parent_id, :user_id]

  belongs_to :owner, class_name: User.name, foreign_key: :user_id
  belongs_to :creator, foreign_key: :creator_id, class_name: User.name

  has_many :profiles, dependent: :destroy
  has_many :users, through: :profiles
  has_many :programs, dependent: :destroy
  has_many :courses, through: :programs
  has_many :managers, through: :courses
  has_many :share_withs, dependent: :destroy
  has_many :shared_training_standards, through: :share_withs,
    source: :training_standard
  has_many :training_standards, dependent: :destroy
  has_many :surveys, dependent: :destroy
  has_many :assignments, dependent: :destroy
  has_many :subjects, dependent: :destroy
  has_many :test_rules, dependent: :destroy
  has_many :moving_histories, dependent: :destroy
  has_many :documents, as: :documentable, dependent: :destroy
  has_many :exams, through: :users
  has_many :meta_types, dependent: :destroy, foreign_key: :organization_id

  scope :belongs_to_creator, ->user_id{where creator_id: user_id}

  validates :name, presence: true

  def assign_programs program_ids
    self.program_ids = self.program_ids + program_ids
  end

  def filtered_training_standards is_shared
    if is_shared == "true"
      self.shared_training_standards.privated +
        TrainingStandard.publiced.where.not(organization: self)
    else
      self.training_standards
    end
  end
end
