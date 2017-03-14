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
  has_many :subjects, through: :course_subjects, dependent: :destroy
  has_many :sources, as: :sourceable,
    class_name: MovingHistory.name, dependent: :destroy
  has_many :destinations, as: :destinationable,
    class_name: MovingHistory.name, dependent: :destroy
  has_many :static_properties, as: :ownerable, dependent: :destroy
  has_many :course_managers
  has_many :course_members
  has_many :managers, through: :course_managers,
    source: :user, dependent: :destroy
  has_many :members, through: :course_members,
    source: :user, dependent: :destroy

  accepts_nested_attributes_for :user_courses, allow_destroy: true

  validates :name, presence: true
  validates :training_standard, presence: true
  validates :owner, presence: true
end
