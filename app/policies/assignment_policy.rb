class AssignmentPolicy < ApplicationPolicy
  def create?
    has_team? && has_subject_status_in_progress?
  end

  private
  def has_team?
    record[:team].users.include? @user
  end

  def has_subject_status_in_progress?
    record[:team].user_subjects.find_by(user_id: @user.id).in_progress?
  end
end
