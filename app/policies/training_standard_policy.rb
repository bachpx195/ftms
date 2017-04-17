class TrainingStandardPolicy < ApplicationPolicy
  def create?
    is_creator_organization? || (super && belong_to_organization?)
  end

  def show?
    is_creator_organization? || (super && has_function?)
  end

  def update?
     is_creator_organization? || (super && has_function?)
  end

  def destroy?
     is_creator_organization? || (super && has_function?)
  end

  private
  def has_function?
    belong_to_organization? || is_creator_organization? ||
      is_creator_training_standard?
  end

  def belong_to_organization?
    record[:organization].users.include? @user
  end

  def is_owner_organization?
    record[:training_standard].organization.owner == @user
  end

  def is_creator_training_standard?
    record[:training_standard].creator == @user
  end

  def is_creator_organization?
    record[:organization].creator == @user
  end
end
