class Subject < ApplicationRecord
  attr_accessor :subject_detail
  acts_as_paranoid

  ATTRIBUTE_PARAMS = [:name, :image, :description, :content, :during_time,
    :training_standard_id]

  mount_uploader :image, ImageUploader

  has_many :standard_subjects, dependent: :destroy
  has_many :training_standards, through: :standard_subjects

  has_many :course_subjects, dependent: :destroy
  has_many :user_subjects, dependent: :destroy
  has_many :tasks, as: :ownerable,
    class_name: StaticTask.name, dependent: :destroy
  has_many :assignments, through: :tasks, source: :targetable,
    source_type: Assignment.name
  has_many :surveys, through: :tasks, source: :targetable,
    source_type: Survey.name
  has_many :test_rules, through: :tasks, source: :targetable,
    source_type: TestRule.name

  belongs_to :organization

  scope :find_remain_subjects, -> ids {where.not id: ids}

  validates :name, presence: true
  validates :during_time,
    numericality: {only_integer: true, greater_than_or_equal_to: 0}

  def subject_details id
    user_subjects.where("user_course_id = ?", id).select :start_date
  end
end
