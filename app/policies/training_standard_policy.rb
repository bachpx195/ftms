class TrainingStandardPolicy < ApplicationPolicy
  def index?
    is_owner_organization? || super
  end

  def create?
    is_owner_organization? || (super && belong_to_organization?)
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
    belong_to_organization? || is_creator_organization? ||
      is_creator_training_standard? || is_shared_training_standard?
  end

  def belong_to_organization?
    record[:organization].users.include? @user
  end

  def is_owner_organization?
    if record[:training_standard]
      record[:training_standard].organization.owner == @user
    else
      record[:organization].owner == @user
    end
  end

  def is_creator_training_standard?
    record[:training_standard].creator == @user
  end

  def is_creator_organization?
    record[:organization].creator == @user
  end

  def is_shared_training_standard?
    record[:training_standard].shared_organizations.include? record[:organization]
  end
end
