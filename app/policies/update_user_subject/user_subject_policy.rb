class UpdateUserSubject::UserSubjectPolicy < ApplicationPolicy
  def update?
    if record[:object].class.name == "Team"
      record[:object].course_subject.course.owner == @user
    else
      record[:object].course.owner == @user
    end
  end
end
