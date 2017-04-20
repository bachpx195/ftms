class ShareWithPolicy < ApplicationPolicy
  def create?
    is_private_training_standard? && (is_creator? || is_owner_organization?) &&
     belong_to_organization?
  end

  private
  def is_owner_organization?
    record[:organization].owner == @user
  end

  def is_private_training_standard?
    record[:training_standard].privated?
  end

  def is_creator?
    record[:training_standard].creator_id == @user.id
  end

  def belong_to_organization?
    record[:training_standard].organization == record[:organization]
  end
end
