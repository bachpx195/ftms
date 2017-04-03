class OrganizationPolicy < ApplicationPolicy

  def create?
    super && (@user.profile.organization == record[:organization])
  end

  def show?
    super &&
      (@user.profile.organization == record[:organization])
  end
end
