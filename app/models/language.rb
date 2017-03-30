class Language < ApplicationRecord
  acts_as_paranoid

  ATTRIBUTE_PARAMS = [:name, :image, :description]

  mount_uploader :image, ImageUploader

  has_many :courses, dependent: :destroy
  has_many :profiles, dependent: :destroy
  has_many :trainees, through: :profiles

  belongs_to :creator, foreign_key: :creator_id, class_name: User.name

  validates :name, presence: true
  validates :image, presence: true
  validates :description, presence: true
end
