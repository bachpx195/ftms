class DynamicTask < Task
  include StiRouting

  belongs_to :user

  validates :user, presence: true

  belongs_to :static_task, foreign_key: :targetable_id, class_name: StaticTask.name

  scope :owner_tasks, -> owner {where targetable_type: Task.name,
    ownerable: owner}

  class << self
    def user_static_tasks
      StaticTask.where id: self.pluck(:targetable_id)
    end
  end
end
