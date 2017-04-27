class UserSubjectPolicy < ApplicationPolicy
  def update?
    super
    record[:user_subject].course_subject.course.owner == @user
  end
end
