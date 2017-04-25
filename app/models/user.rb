class User < ApplicationRecord
  mount_uploader :avatar, ImageUploader

  acts_as_token_authenticatable
  acts_as_paranoid

  devise :database_authenticatable, :rememberable, :validatable, :trackable

  ATTRIBUTES_PARAMS = [:email, :password]
  USER_PROFILE_ATTRIBUTES_PARAMS = [:name, :email, :password,
    :password_confirmation, :avatar, :trainer_id,
    profile_attributes: Profile::ATTRIBUTES_PARAMS]
  ATTRIBUTES_FUNCTION_PARAMS = [user_functions_attributes: [:id,
    :function_id, :user_id, :_destroy]]

  has_one :profile, dependent: :destroy

  has_many :moving_histories, dependent: :destroy
  has_many :organizations, dependent: :destroy
  has_many :user_courses, dependent: :destroy, foreign_key: :user_id
  has_many :user_programs, dependent: :destroy
  has_many :user_subjects, dependent: :destroy
  has_many :course_subjects, through: :user_subjects
  has_many :course_members, dependent: :destroy
  has_many :course_managers, dependent: :destroy
  has_many :member_courses, through: :course_members, source: :course
  has_many :manager_courses, through: :course_managers, source: :course

  has_many :user_roles, dependent: :destroy
  has_many :roles, through: :user_roles
  has_many :user_functions, dependent: :destroy
  has_many :functions, through: :user_functions
  has_many :training_standards, foreign_key: :creator_id,
    dependent: :destroy
  has_many :universities, foreign_key: :creator_id, dependent: :destroy
  has_many :languages, foreign_key: :creator_id, dependent: :destroy
  has_many :stages, foreign_key: :creator_id, dependent: :destroy
  has_many :programs, foreign_key: :creator_id, dependent: :destroy
  has_many :teams, foreign_key: :creator_id, dependent: :destroy
  has_many :evaluation_templates, foreign_key: :creator_id, dependent: :destroy
  has_many :evaluation_standards, foreign_key: :creator_id, dependent: :destroy
  has_many :subjects, foreign_key: :creator_id, dependent: :destroy
  has_many :assignments, foreign_key: :creator_id, dependent: :destroy
  has_many :surveys, foreign_key: :creator_id, dependent: :destroy
  has_many :projects, foreign_key: :creator_id, dependent: :destroy
  has_many :test_rules, foreign_key: :creator_id, dependent: :destroy
  has_many :requirements, foreign_key: :creator_id, dependent: :destroy
  has_many :created_courses, class_name: Course.name, foreign_key: :creator_id,
    dependent: :destroy
  has_many :courses, through: :user_courses, dependent: :destroy
  has_many :owned_courses, class_name: Course.name, foreign_key: :owner_id,
    dependent: :destroy
  has_many :dynamic_tasks, dependent: :destroy
  has_many :member_evaluations, foreign_key: :member_id,
    dependent: :destroy
  has_many :manager_evaluations, class_name: MemberEvaluation.name,
    foreign_key: :manager_id, dependent: :destroy
  has_many :static_tasks, through: :dynamic_tasks, class_name: StaticTask.name,
     as: :targetable
  has_many :exams, dependent: :destroy
  has_many :meta_types, dependent: :destroy, foreign_key: :user_id

  validates :name, presence: true
  validates :email, presence: true

  accepts_nested_attributes_for :user_functions, allow_destroy: true
  accepts_nested_attributes_for :profile

  scope :course_members_not_rejected, -> do
    CourseMember.where.not status: "rejected"
  end

  def user_tasks task_name, ownerable
    tasks = self.dynamic_tasks.map do |dynamic_task|
      dynamic_task_targetable = dynamic_task.targetable
      if dynamic_task_targetable &&
        dynamic_task_targetable.targetable_type == task_name &&
        dynamic_task.ownerable == ownerable
        dynamic_task_targetable.targetable
      end
    end
    tasks.reject! &:nil?
    tasks
  end

  def user_dynamic_tasks
    tasks = self.dynamic_tasks.map do |dynamic_task|
      dynamic_task if dynamic_task.targetable.targetable_type = "Assignment"
    end
    tasks.reject! &:nil?
    tasks
  end

  def user_assigmnent
    tasks = self.dynamic_tasks.map do |dynamic_task|
      if dynamic_task.targetable.targetable_type = "Assignment"
        dynamic_task.targetable.targetable
      end
    end
    tasks.reject! &:nil?
    tasks
  end

  def find_base_component
    function = self.functions.first
    box = function.controller_name.split("/").first.capitalize
    if box == "Users"
      "TimeLineBox"
    else
      box.singularize + "Box"
    end
  end
end
