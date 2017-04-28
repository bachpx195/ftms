class OrganizationPolicy < ApplicationPolicy
  def show?
    (super && has_function?) ||
      record[:organization].owner == @user ||
      record[:organization].creator == @user
  end

  def update?
    (super && has_function?) ||
      record[:organization].owner == @user
  end

  def destroy?
    (super && has_function?) ||
      record[:organization].owner == @user
  end

  private
  def has_function?
    record[:organization].users.include? @user
  end
end
