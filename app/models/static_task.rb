class StaticTask < Task
  include StiRouting

  has_many :dynamic_tasks, ->{where targetable_type: StaticTask.name},
    foreign_key: :targetable_id, class_name: DynamicTask.name
end
