class DynamicTask < Task
  include StiRouting

  belongs_to :objectable, polymorphic: true
  belongs_to :static_task, foreign_key: :targetable_id,
    class_name: StaticTask.name

  has_many :meta_tasks, dependent: :destroy

  validates :objectable, presence: true

  scope :owner_tasks, ->owner{where targetable_type: Task.name, ownerable: owner}
  scope :target_tasks, ->targetable{where targetable: targetable}
  scope :team_tasks, ->object{where objectable: object}
  enum status: [:init, :in_progress, :finished, :reject]

  def targetable_type= type
    super type.to_s.classify.constantize.base_class.to_s
  end

  class << self
    def user_static_tasks
      StaticTask.where id: self.pluck(:targetable_id)
    end
  end
end
