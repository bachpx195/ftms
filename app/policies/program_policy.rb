class ProgramPolicy < ApplicationPolicy

  def show?
    super &&
      (@user.organizations.include? record[:program].organization ||
        record[:program].organization.creator == @user ||
        record[:program].organization.owner == @user ||
        record[:program].creator == @user)
  end

  def update?
    show?
  end

  def destroy?
    show?
  end
end
