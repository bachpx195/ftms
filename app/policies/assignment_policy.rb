class AssignmentPolicy < ApplicationPolicy
  def create?
    record[:team].users.include? @user
  end
end
