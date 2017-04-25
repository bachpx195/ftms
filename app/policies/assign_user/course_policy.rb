class AssignUser::CoursePolicy < ApplicationPolicy

  def update?
    (super && belong_to_organization?) || is_organization_owner? ||
      is_program_creator? || is_course_manager?
  end

  private
  def is_organization_owner?
    record[:course].program.organization == @user
  end

  def is_program_creator?
    record[:course].program.creator == @user
  end

  def is_course_manager?
    record[:course].course_managers.pluck(:user_id).include? @user.id
  end

  def belong_to_organization?
    @user.profile.organization == record[:course].program.organization
  end
end
