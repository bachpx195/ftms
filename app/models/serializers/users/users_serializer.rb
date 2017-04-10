class Serializers::Users::UsersSerializer <
  Serializers::SupportSerializer
  attrs :id, :email, :name, :avatar, :trainer_id, :created_at, :updated_at,
    :type
  attrs :user_program, :user_organization_programs, :user_profile,
    :user_organization, if: :check_profile

  delegate :type, to: :object

  def user_program
    Serializers::Users::UserProgramSerializer
      .new(object: object.profile.program).serializer
  end

  def user_organization_programs
    user_profile = object.profile
    remaining_programs = user_profile.organization.programs -
      [user_profile.program]
    Serializers::Users::UserProgramSerializer
      .new(object: remaining_programs).serializer
  end

  def user_organization
    Hash[:id, object.profile.organization.id]
  end

  def user_profile
    Serializers::Users::UserProfileSerializer
      .new(object: object.profile).serializer
  end

  def avatar
    Hash[:url, object.avatar.url]
  end

  private
  def check_profile
    object.profile.present?
  end
end
