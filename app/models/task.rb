class Task < ApplicationRecord
  acts_as_paranoid

  belongs_to :targetable, polymorphic: true
  belongs_to :ownerable, polymorphic: true
end
