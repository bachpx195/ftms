class UserPolicy < ApplicationPolicy

  def index?
    (super && belong_to_organization?) || is_owner_organization?
  end

  def create?
    (super && belong_to_organization?) || is_owner_organization?
  end

  def show?
    is_owner_organization? || (super && belong_to_organization?) ||
      @user == record[:user]
  end

  def update?
    (super && belong_to_organization?) || is_owner_organization? ||
      @user == record[:user]
  end

  private
  def is_owner_organization?
    record[:organization].owner == @user
  end

  def belong_to_organization?
    record[:organization].users.include? @user
  end
end
