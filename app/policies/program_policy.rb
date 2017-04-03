class ProgramPolicy < ApplicationPolicy

  def create?
    super && (@user.profile.organization == record[:organization])
  end

  def show?
    super &&
      (@user.profile.organization == record[:program].organization)
  end
end
