class UserPolicy < ApplicationPolicy

  def index?
    (super && belong_to_organization?) || is_owner_organization?
  end

  private
  def is_owner_organization?
    record[:organization].owner == @user
  end

  def belong_to_organization?
    record[:organization].users.include? @user
  end
end
