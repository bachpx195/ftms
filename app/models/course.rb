class Course < ApplicationRecord
  acts_as_paranoid

  mount_uploader :image, ImageUploader

  USER_COURSE_ATTRIBUTES_PARAMS = [user_courses_attributes: [:id, :user_id,
    :type, :_destroy]]
  ATTRIBUTE_PARAMS = [:name, :image, :description, :status, :start_date,
    :language_id, :program_id, :end_date, :training_standard_id, :owner_id]

  enum status: [:init, :in_progress, :finished]

  belongs_to :language
  belongs_to :program
  belongs_to :training_standard
  belongs_to :creator, foreign_key: :creator_id, class_name: User.name
  belongs_to :owner, foreign_key: :owner_id, class_name: User.name

  has_many :user_courses, dependent: :destroy
  has_many :course_subjects, dependent: :destroy
  has_many :user_subjects, through: :course_subjects
  has_many :subjects, through: :course_subjects
  has_many :sources, as: :sourceable,
    class_name: MovingHistory.name, dependent: :destroy
  has_many :destinations, as: :destinationable,
    class_name: MovingHistory.name, dependent: :destroy
  has_many :course_managers, dependent: :destroy
  has_many :course_members, dependent: :destroy
  has_many :managers, through: :course_managers, source: :user
  has_many :members, through: :course_members, source: :user
  has_many :static_tasks, as: :ownerable,
    class_name: StaticTask.name, dependent: :destroy
  has_many :static_surveys, through: :static_tasks, source: :targetable,
    source_type: Survey.name
  has_many :static_projects, through: :static_tasks, source: :targetable,
    source_type: Project.name
  has_many :static_test_rules, through: :static_tasks, source: :targetable,
    source_type: TestRule.name
  has_many :member_evaluations, as: :targetable, dependent: :destroy

  accepts_nested_attributes_for :user_courses, allow_destroy: true

  validates :name, presence: true
  validates :training_standard, presence: true
  validates :owner, presence: true
end
