class AssignTask::TaskPolicy < ApplicationPolicy
  def create?
    super && has_function?
  end

  def destroy?
    super && has_function?
  end

  private
  def has_function?
    if record[:ownerable].class == Course
      has_function_course?
    elsif record[:ownerable].class == CourseSubject
      has_function_course_subject?
    elsif record[:ownerable].class == Subject
      has_function_subject?
    end
  end

  def has_function_course?
    @user.organizations.include?(record[:ownerable].program.organization) ||
      record[:ownerable].program.creator == @user ||
      record[:ownerable].program.organization.owner == @user ||
      record[:ownerable].creator == @user ||
      record[:ownerable].course_managers.pluck(:user_id).include?(@user.id)
  end

  def has_function_course_subject?
    @user.organizations.include?(record[:ownerable].course.program.organization) ||
      record[:ownerable].course.program.creator == @user ||
      record[:ownerable].course.program.organization.owner == @user ||
      record[:ownerable].creator == @user ||
      record[:ownerable].course.course_managers.pluck(:user_id).include?(@user.id)
  end

  def has_function_subject?
    @user.organizations.include?(record[:ownerable].organization) ||
      record[:ownerable].organization.creator == @user ||
      record[:ownerable].organization.owner == @user ||
      record[:ownerable].creator == @user
  end
end
