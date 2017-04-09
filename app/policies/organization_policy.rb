class OrganizationPolicy < ApplicationPolicy
  def index?
    function = Function.where controller_name: "organizations", action: "create"
    (@user.functions.include? function) || super
  end

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
    record[:organization].creator == @user ||
      record[:organization].owner == @user
  end
end
