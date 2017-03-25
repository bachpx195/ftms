class TeamMember < ApplicationRecord
  acts_as_paranoid

  belongs_to :user, foreign_key: :member_id
  belongs_to :team
end
