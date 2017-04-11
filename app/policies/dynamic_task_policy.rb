class DynamicTaskPolicy < ApplicationPolicy
  def update?
    record[:team_mem].include? @user.id
  end
end
