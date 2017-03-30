class Team < ApplicationRecord
  acts_as_paranoid

  ATTRIBUTE_PARAMS = [:name, :course_subject_id]

  belongs_to :course_subject
  belongs_to :creator, foreign_key: :creator_id, class_name: User.name

  has_many :user_subjects, dependent: :destroy
  has_many :users, through: :user_subjects, source: :user
end
