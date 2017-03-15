class User < ApplicationRecord

  mount_uploader :avatar, ImageUploader

  acts_as_token_authenticatable
  acts_as_paranoid

  devise :database_authenticatable, :rememberable, :validatable

  ATTRIBUTES_PARAMS = [:email, :password]

  has_one :profile, dependent: :destroy

  has_many :moving_histories, dependent: :destroy
  has_many :organizations, dependent: :destroy
  has_many :team_members, dependent: :destroy
  has_many :user_courses, dependent: :destroy
  has_many :user_programs, dependent: :destroy
  has_many :user_subjects, dependent: :destroy
  has_many :user_roles, dependent: :destroy
  has_many :roles, through: :user_roles
  has_many :user_functions, dependent: :destroy
  has_many :functions, through: :user_functions
  has_many :training_standards, foreign_key: :creator_id
  has_many :created_courses, class_name: Course.name, foreign_key: :creator_id,
    dependent: :destroy
  has_many :courses, through: :user_courses, dependent: :destroy
  has_many :owned_courses, class_name: Course.name, foreign_key: :owner_id,
    dependent: :destroy
  has_many :dynamic_tasks, dependent: :destroy

  accepts_nested_attributes_for :user_functions, allow_destroy: true

  def find_base_component
    function = self.functions.order_by_parent_id.first
    controller = function.controller_name
    action = function.action
    if action == "show"
      controller.split("/").first.capitalize.singularize + "ShowBox"
    else
      controller.split("/").first.capitalize.singularize + "Box"
    end
  end
end
