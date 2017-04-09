class SubjectPolicy < ApplicationPolicy

  def show?
    super &&
      (@user.organizations.include?(record[:subject].organization) ||
      record[:subject].organization.creator == @user ||
      record[:subject].organization.owner == @user ||
      record[:subject].creator == @user ||
      record[:course_subject].course.user_courses.pluck(:user_id).include?(@user.id)
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
    @user.organizations.include?(record[:subject].organization) ||
      record[:subject].organization.creator == @user ||
      record[:subject].organization.owner == @user ||
      record[:subject].creator == @user ||
      record[:course_subject].course.course_managers.pluck(:user_id).include?(@user.id)
  end
end
