class Serializers::Projects::ProjectsSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :description, :organization

  def organization
    Serializers::Organizations::OrganizationsSerializer
      .new(object: @object.organization).serializer
  end
end
