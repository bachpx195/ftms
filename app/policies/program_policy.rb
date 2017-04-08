class ProgramPolicy < ApplicationPolicy

  def show?
    super && has_function?
  end

  def update?
    super && has_function?
  end

  def destroy?
    super && has_function?
  end

  private
  def has_function?
    @user.organizations.include? record[:program].organization ||
      record[:program].organization.creator == @user ||
      record[:program].organization.owner == @user ||
      record[:program].creator == @user
  end
end
