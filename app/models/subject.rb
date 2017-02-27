class Subject < ApplicationRecord
  acts_as_paranoid

  ATTRIBUTE_PARAMS = [:name, :image, :description, :content, :training_standard_id]

  mount_uploader :image, ImageUploader

  belongs_to :training_standard

  has_many :course_subjects, dependent: :destroy
  has_many :user_subjects, dependent: :destroy
  has_many :owner_subjects, as: :ownerable,
    class_name: StaticProperty.name, dependent: :destroy
  has_many :property_subjects, as: :propertiable,
    class_name: StaticProperty.name, dependent: :destroy

  validates :name, presence: true
end
