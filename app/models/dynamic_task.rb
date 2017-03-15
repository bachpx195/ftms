class DynamicTask < Task
  include StiRouting

  belongs_to :user

  validates :user, presence: true
end
