class Serializers::Organizations::SubOrganizationSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :sub_organizations

  def sub_organization
    if object.children
      Serializers::Organizations::SubOrganizationSerializer
        .new(object: object.children).serializer
    else
      Array.new
    end
  end
end
