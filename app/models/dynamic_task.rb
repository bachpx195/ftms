class DynamicTask < Task
  include StiRouting

  belongs_to :user
  has_many :meta_tasks, dependent: :destroy

  validates :user, presence: true

  belongs_to :static_task, foreign_key: :targetable_id,
    class_name: StaticTask.name


  scope :owner_tasks, -> owner{where targetable_type: Task.name,
    ownerable: owner}
  scope :target_tasks, -> targetable{where targetable: targetable}
  scope :team_tasks, -> user_ids {where("user_id in (?)", user_ids)}

  enum status: [:init, :in_progress, :finish, :reject]

  class << self
    def user_static_tasks
      StaticTask.where id: self.pluck(:targetable_id)
    end
  end
end
