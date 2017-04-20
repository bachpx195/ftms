class Supports::OrganizationSupport
  def initialize args = {}
    @organization = args[:organization]
    @role_support = args[:role_support]
    @user = args[:user]
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

  def other_organizations
    other_orgs = @user.organizations.where.not id: @organization.id
    Serializers::Organizations::SimpleOrganizationSerializer
      .new(object: other_orgs).serializer
  end
end
