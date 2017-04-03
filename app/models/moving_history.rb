class MovingHistory < ApplicationRecord
  acts_as_paranoid

  belongs_to :organization
  belongs_to :user
  belongs_to :sourceable, polymorphic: true
  belongs_to :destinationable, polymorphic: true
end
