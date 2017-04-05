class MovingHistory < ApplicationRecord
  acts_as_paranoid

  belongs_to :organization
  belongs_to :user
  belongs_to :sourceable, polymorphic: true
  belongs_to :destinationable, polymorphic: true

  delegate :name, to: :user, prefix: true
  delegate :name, to: :organization, prefix: true
  delegate :name, to: :sourceable, prefix: :source
  delegate :name, to: :destinationable, prefix: :destination

  scope :by_organization,
    ->organization_id{where organization_id: organization_id}
end
