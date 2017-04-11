class SubjectPolicy < ApplicationPolicy
  def index?
    super
  end

  def show?
    check_owner? || check_creator? ||
    (super &&
      (@user.organizations.include?(record[:subject].organization) ||
      record[:subject].organization.creator == @user ||
      record[:course_subject].course.user_courses.pluck(:user_id)
        .include?(@user.id) if record[:course_subject]
      )
    )
  end

  def update?
    check_owner_organization || check_creator_subject || (super && has_function?)
  end

  def destroy?
    check_owner_organization || check_creator_subject || (super && has_function?)
  end

  private
  def has_function?
    @user.organizations.include?(record[:subject].organization) ||
      (record[:subject].organization.creator == @user) ||
      check_creator_subject? ||
      record[:course_subject].course.course_managers.pluck(:user_id)
        .include?(@user.id)
  end

  def check_creator_subject?
    record[:subject].creator == @user
  end

  def check_owner_subject?
    record[:subject].organization.owner == @user
  end

  def check_owner_organization?
    record[:subject].organization.owner == @user
  end
end
