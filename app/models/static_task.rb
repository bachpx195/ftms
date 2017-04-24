class StaticTask < Task
  include StiRouting

  has_many :dynamic_tasks, ->{where targetable_type: Task.name},
    foreign_key: :targetable_id, class_name: DynamicTask.name,
    dependent: :destroy
  has_many :meta_tasks, through: :dynamic_tasks
end
