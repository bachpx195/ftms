class CreateTask::TaskPolicy < ApplicationPolicy
  def create?
    if record[:ownerable].class == Course
      (record[:ownerable].program.organization.owner == @user) ||
        (super && has_function_course?)
    elsif record[:ownerable].class == CourseSubject
      (record[:ownerable].course.program.organization.owner == @user) ||
        (super && has_function_course_subject?)
    elsif record[:ownerable].class == Subject
      (record[:ownerable].organization.owner == @user) ||
        (super && has_function_subject?)
    elsif record[:ownerable].class == Team
      (record[:ownerable].course_subject.course.organization.owner == @user) ||
        (super && has_function_team?)
    end
  end

  def destroy?
    if record[:ownerable].class == Course
      (record[:ownerable].program.organization.owner == @user) ||
        (super && has_function_course?)
    elsif record[:ownerable].class == CourseSubject
      (record[:ownerable].course.program.organization.owner == @user) ||
        (super && has_function_course_subject?)
    elsif record[:ownerable].class == Subject
      (record[:ownerable].organization.owner == @user) ||
        (super && has_function_subject?)
    elsif record[:ownerable].class == Team
      (record[:ownerable].course_subject.course.organization.owner == @user) ||
        (super && has_function_team?)
    end
  end

  private
  def has_function_course?
    @user.organizations.include?(record[:ownerable].program.organization) ||
      record[:ownerable].program.creator == @user ||
      record[:ownerable].creator == @user ||
      record[:ownerable].course_managers.pluck(:user_id).include?(@user.id)
  end

  def has_function_course_subject?
    @user.organizations.include?(record[:ownerable].course.program
      .organization) ||
      record[:ownerable].course.program.creator == @user ||
      record[:ownerable].course.creator == @user ||
      record[:ownerable].course.course_managers.pluck(:user_id)
        .include?(@user.id)
  end

  def has_function_subject?
    @user.organizations.include?(record[:ownerable].organization) ||
      record[:ownerable].organization.creator == @user ||
      record[:ownerable].creator == @user
  end

  def has_function_team?
    course = record[:ownerable].course_subject.course
    @user.organizations.include?(course.program.organization) ||
      course.program.creator == @user ||
      course.program.organization.owner == @user ||
      course.creator == @user ||
      course.course_managers.pluck(:user_id).include?(@user.id)
  end
end
