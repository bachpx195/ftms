class ProgramPolicy < ApplicationPolicy

  def show?
    (record[:program].organization.owner == @user) || (super && has_function?)
  end

  def update?
    (record[:program].organization.owner == @user) || (super && has_function?)
  end

  def destroy?
    (record[:program].organization.owner == @user) || (super && has_function?)
  end

  private
  def has_function?
    @user.organizations.include?(record[:program].organization) ||
      record[:program].organization.creator == @user ||
      record[:program].creator == @user
  end
end
