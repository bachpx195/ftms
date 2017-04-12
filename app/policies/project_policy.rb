class ProjectPolicy < ApplicationPolicy
  def show?
    course_members? ||(super && has_function?)
  end

  def update?
    course_managers? || (super && has_function?)
  end

  def destroy?
    course_managers? || (super && has_function?)
  end
  
  private
  def has_function?
    check_organization?|| creator?
  end

  def is_course_members?
    (record[:project].course_subject.user_subjects.pluck(:user_id)
      .include? @user.id == @user)
  end

  def is_course_managers?
    (record[:project].course_subject.course.course_managers.
      pluck(:user_id).include? @user.id == @user)
  end

  def belong_to_organization?
    @user.profile.organization == (record[:project].organization)
  end

  def is_creator?
    record[:project].creator == @user
  end
end
