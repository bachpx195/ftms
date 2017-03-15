class Subject < ApplicationRecord
  acts_as_paranoid

  ATTRIBUTE_PARAMS = [:name, :image, :description, :content, :training_standard_id]

  mount_uploader :image, ImageUploader

  has_many :standard_subjects, dependent: :destroy
  has_many :training_standards, through: :standard_subjects, dependent: :destroy

  has_many :course_subjects, dependent: :destroy
  has_many :user_subjects, dependent: :destroy
  has_many :assignments, dependent: :destroy
  has_many :surveys, dependent: :destroy
  has_many :projects, dependent: :destroy
  has_many :test_rules, dependent: :destroy

  scope :find_remain_subjects, -> ids {where.not id: ids}

  validates :name, presence: true
end
