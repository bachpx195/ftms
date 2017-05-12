class CoursePolicy < ApplicationPolicy

  def index?
    check_index?
  end

  def create?
    is_owner_organization? || is_creator_program? ||
      (super && belongs_to_organization)
  end

  def show?
    is_owner_organization? || is_creator_owner_course? ||
      belongs_to_course? || is_creator_program? ||
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
    if record[:course]
      record[:course].program.organization.owner == @user
    else
      record[:program].organization.owner == @user
    end
  end

  def is_creator_owner_course?
    record[:course].creator == @user || record[:course].owner == @user
  end

  def belongs_to_course?
    record[:course].user_courses.pluck(:user_id).include? @user.id
  end

  def check_index?
    record[:courses].each do |course|
      true if course.program.organization.owner == @user
    end
  end
end
