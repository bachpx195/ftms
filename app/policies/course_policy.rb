class CoursePolicy < ApplicationPolicy
  def show?
    super && (
      @user.organizations.include?(record[:course].program.organization) ||
      record[:course].program.creator == @user ||
      record[:course].program.organization.owner == @user ||
      record[:course].creator == @user ||
      record[:course].user_courses.pluck(:user_id).include?(@user.id)
    )
  end

  def update?
    super && has_function?
  end

  def destroy?
    super && has_function?
  end

  private
  def has_function?
    @user.organizations.include?(record[:course].program.organization) ||
      record[:course].program.creator == @user ||
      record[:course].program.organization.owner == @user ||
      record[:course].creator == @user ||
      record[:course].course_managers.pluck(:user_id).include?(@user.id)
  end
end
