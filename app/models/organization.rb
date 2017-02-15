class Organization < ApplicationRecord
  acts_as_paranoid
  acts_as_tree order: "created_at DESC", dependent: :destroy

  ATTRIBUTES_PARAMS = [:name, :parent_id]

  belongs_to :owner, class_name: User.name, foreign_key: :user_id

  has_many :profiles, dependent: :destroy
  has_many :users, through: :profiles
  has_many :programs, dependent: :destroy

  validates :name, presence: true
end
