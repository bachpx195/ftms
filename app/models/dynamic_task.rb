class DynamicTask < Task
  include StiRouting

  belongs_to :user

  validates :user, presence: true

  belongs_to :static_task, foreign_key: :targetable_id,
    class_name: StaticTask.name

  scope :owner_tasks, ->owner do
    where targetable_type: Task.name, ownerable: owner
  end

  enum status: [:in_progress, :finish]

  class << self
    def user_static_tasks
      StaticTask.where id: self.pluck(:targetable_id)
    end
  end
end
