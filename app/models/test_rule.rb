class TestRule < ApplicationRecord
  belongs_to :subject
  has_many :owners, as: :ownerable,
    class_name: StaticTask.name, dependent: :destroy
  has_many :targets, as: :targetable,
    class_name: StaticTask.name, dependent: :destroy
end
