class Serializers::ChangeProfile::UserDetailSerializer <
  Serializers::SupportSerializer
  attrs :user
  attrs :organization, :program, :organizations, :programs, if: :profile?

  def user
    Serializers::Users::UsersSerializer.new(object: object).serializer
  end

  def organization
    Serializers::Organizations::OrganizationsSerializer
      .new(object: object.profile.organization).serializer
  end

  def program
    Serializers::Programs::ProgramsSerializer
      .new(object: object.profile.program).serializer
  end

  def organizations
    Serializers::Organizations::OrganizationsSerializer
      .new(object: supports.organizations).serializer
  end

  def programs
    Serializers::Programs::ProgramsSerializer
      .new(object: supports.programs).serializer
  end

  private
  def profile?
    object.profile.present?
  end
end
