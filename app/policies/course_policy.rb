class CoursePolicy < ApplicationPolicy

  def create?
    is_owner_organization? || is_creator_program? ||
      (super && belongs_to_organization)
  end

  def show?
    is_owner_organization? || is_creator_owner_course? ||
      is_creator_program? || is_course_manager? ||
      (super && belongs_to_organization?)
  end

  def update?
    is_owner_organization? || is_creator_owner_course? ||
      is_creator_program? || is_course_manager? ||
      (super && belongs_to_organization?)
  end

  def destroy?
    is_owner_organization? || is_creator_program? ||
      (super && belongs_to_organization)
  end

  private
  def belongs_to_organization?
    record[:course].program.organization.users.include? @user
  end

  def is_creator_program?
    record[:program].creator == @user
  end

  def is_owner_organization?
    record[:program].organization.owner == @user
  end

  def is_creator_owner_course?
    record[:course].creator == @user || record[:course].owner == @user
  end

  def is_course_manager?
    record[:course].course_managers.pluck(:user_id).include? @user.id
  end
end
