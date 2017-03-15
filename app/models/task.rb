class Task < ApplicationRecord
  require_dependency "static_task"
  require_dependency "dynamic_task"

  acts_as_paranoid

  belongs_to :targetable, polymorphic: true
  belongs_to :ownerable, polymorphic: true
end
