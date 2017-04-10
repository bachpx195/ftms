class SubjectPolicy < ApplicationPolicy
  def show?
    (record[:subject].organization.owner == @user) ||
    (super &&
      (@user.organizations.include?(record[:subject].organization) ||
      record[:subject].organization.creator == @user ||
      record[:subject].creator == @user ||
      record[:course_subject].course.user_courses.pluck(:user_id)
        .include?(@user.id) if record[:course_subject]
      )
    )
  end

  def update?
    (record[:subject].organization.owner == @user) || (super && has_function?)
  end

  def destroy?
    (record[:subject].organization.owner == @user) || (super && has_function?)
  end

  private
  def has_function?
    @user.organizations.include?(record[:subject].organization) ||
      record[:subject].organization.creator == @user ||
      record[:subject].creator == @user ||
      record[:course_subject].course.course_managers.pluck(:user_id)
        .include?(@user.id)
  end
end
