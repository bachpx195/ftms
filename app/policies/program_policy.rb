class ProgramPolicy < ApplicationPolicy

  def create?
    is_owner_organization? || (super && has_function?)
  end

  def show?
    is_owner_organization? || (super && has_function?)
  end

  def update?
    is_owner_organization? || (super && has_function?)
  end

  def destroy?
    is_owner_organization? || (super && has_function?)
  end

  private
  def has_function?
    belong_to_organization?|| is_creator_organization? || is_creator_program?
  end

  def is_owner_organization?
    if record[:program]
      record[:program].organization.owner == @user
    else
      record[:organization].owner == @user
    end
  end

  def belong_to_organization?
    record[:program].organization.users.include?(@user)
  end

  def is_creator_organization?
    record[:program].organization.creator == @user
  end

  def is_creator_program?
    record[:program].creator == @user
  end
end
