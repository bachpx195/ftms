class UpdateUserSubject::UserSubjectPolicy < ApplicationPolicy
  def update?
    is_owner_organization? || is_course_manager? || is_course_owner? ||
      (super && belongs_to_organization?)
  end

  private
  def is_owner_organization?
    if record[:object].class.name == "Team"
      record[:object].course_subject.subject.organization.owner == @user
    else
      record[:object].subject.organization.owner == @user
    end
  end

  def belongs_to_organization?
    if record[:object].class.name == "Team"
      record[:object].course_subject.subject.organization.users.inlcude? @user
    else
      record[:object].subject.organization.users.inlcude? @user
    end
  end

  def is_course_manager?
    if record[:object].class.name == "Team"
      record[:object].course_subject.course.course_managers.pluck(:user_id).include? @user.id
    else
      record[:object].course.course_managers.pluck(:user_id).include? @user.id
    end
  end

  def is_course_owner?
    if record[:object].class.name == "Team"
      record[:object].course_subject.course.owner == @user
    else
      record[:object].course.owner == @user
    end
  end
end
