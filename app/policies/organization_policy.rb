class OrganizationPolicy < ApplicationPolicy

  def show?
    super &&
      (@user.profile.organization == record[:organization] ||
        record[:organization].creator == @user ||
        record[:organization].owner == @user)
  end

  def update?
    super &&
      (record[:organization].creator == @user ||
        record[:organization].owner == @user) &&
      (@user.organizations.include? record[:organization])
  end

  def destroy?
    update?
  end
end
