class RequirementPolicy < ApplicationPolicy
  def create?
    is_course_managers? || is_owner? || (super && is_team_members?)
  end

  def show?
    is_course_managers? || is_owner? || 
      (super && (is_team_members? || belong_to_organization?))
  end

  def update?
    is_course_managers? || is_owner? || 
      (super && (is_team_members? || belong_to_organization?))
  end

  def destroy?
    is_course_managers? || is_owner? || 
      (super && (is_team_members? || belong_to_organization?))
  end
  
  private
  def is_team_members?
    (record[:requirement].project.course_subject.team_users
      .include? @user)
  end

  def is_course_managers?
    (record[:requirement].project.course_subject.course.course_managers.
      pluck(:user_id).include? @user.id)
  end

  def belong_to_organization?
    @user.profile.organization == record[:requirement].project.organization
  end

  def is_owner_organization?
    record[:requirement].project.organization.owner == @user
  end
end
