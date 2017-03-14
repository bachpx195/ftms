class DynamicTask < Task
  include StiRouting

  belongs_to :user
end
