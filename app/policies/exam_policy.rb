class ExamPolicy < ApplicationPolicy
  def index?
    !record[:exam_supports].organization ||
      (record[:exam_supports].organization &&
        (check_owner? || check_creator? || check_manager?))
  end

  def show?
    super && check_show_exam?
  end

  def create?
    super && check_member_in_course?
  end

  def update?
    super && check_show_exam?
  end

  private
  def check_show_exam?
    (!check_organization? && check_user?) ||
      (check_organization? &&
        (check_owner? || check_creator? || check_course_manager?))
  end

  def check_user?
    record[:exam_supports].exam.user == @user
  end

  def check_organization?
    record[:exam_supports].organization
  end

  def check_owner?
    record[:exam_supports].organization.owner == @user
  end

  def check_creator?
    record[:exam_supports].organization.creator == @user
  end

  def check_manager?
    record[:exam_supports].organization.managers.include?(@user)
  end

  def check_course_manager?
    course = (record[:exam_supports].exam.course_subject ||
      record[:exam_supports].exam).course
    return false unless course
    course.managers.include? @user
  end

  def check_member_in_course?
    return false unless record[:exam_supports].course_subject
    record[:exam_supports].course_subject.course.members
      .include? record[:exam_supports].user
  end
end
