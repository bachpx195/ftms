class SubjectPolicy < ApplicationPolicy

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
    @user.organizations.include? record[:subject].organization ||
      record[:subject].organization.creator == @user ||
      record[:subject].organization.owner == @user ||
      record[:subject].creator == @user
  end
end
