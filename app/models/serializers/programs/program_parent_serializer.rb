class Serializers::Programs::ProgramParentSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :organization

  def organization
    Serializers::Organizations::OrganizationsSerializer
      .new(object: object.organization).serializer
  end
end
