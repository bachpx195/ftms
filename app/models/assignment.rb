class Assignment < ApplicationRecord
  belongs_to :subject
  has_many :owners, as: :ownerable,
    class_name: Task.name, dependent: :destroy
  has_many :targets, as: :targetable,
    class_name: Task.name, dependent: :destroy
end
