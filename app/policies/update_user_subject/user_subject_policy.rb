class UpdateUserSubject::UserSubjectPolicy < ApplicationPolicy
  def update?
    if record[:object].class.name == "Team"
      record[:object].course_subject.course.course_managers.pluck(:user_id).include? @user.id
    else
      record[:object].course.course_managers.pluck(:user_id).include? @user.id
    end
  end
end
