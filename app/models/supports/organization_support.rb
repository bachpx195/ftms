class Supports::OrganizationSupport
  def initialize args = {}
    @organization = args[:organization]
    @role_support = args[:role_support]
  end

  def organization
    Serializers::Organizations::OrganizationDetailSerializer
      .new(object: @organization).serializer
  end

  def programs
    Serializers::Organizations::ProgramSerializer
     .new(object: @organization.programs).serializer
  end

  def owners
    Serializers::Users::UsersSerializer
      .new(object: @role_support.owners).serializer
  end

  def all_roles
    Serializers::Roles::RolesSerializer
     .new(object: @role_support.all_roles).serializer
  end

  def documents
    @organization.documents
  end
end
