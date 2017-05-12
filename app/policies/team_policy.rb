class TeamPolicy < ApplicationPolicy

  def create?
    (super && belong_to_organization?) || is_owner_organization? || is_course_manager?
  end

  def show?
    (super && belong_to_organization?) || is_owner_organization? ||
      @user == current_user || is_course_manager?
  end

  private
  def is_owner_organization?
    record[:course].program.organization.owner == @user
  end

  def belong_to_organization?
    record[:course].program.organization.users.include? @user
  end

  def is_course_manager?
    record[:course].course_managers.pluck(:user_id).include? @user.id
  end
end
