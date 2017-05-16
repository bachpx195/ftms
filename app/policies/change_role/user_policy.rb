class ChangeRole::UserPolicy < ApplicationPolicy
  def show?
    is_owner_organization? || (super && belongs_to_organization?)
  end

  def update?
    is_owner_organization? || (super && belongs_to_organization?)
  end

  private
  def is_owner_organization?
    record[:organization].owner == @user
  end

  def belongs_to_organization?
    record[:organization].users.include? @user
  end
end
