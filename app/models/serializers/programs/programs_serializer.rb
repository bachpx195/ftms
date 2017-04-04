class Serializers::Programs::ProgramsSerializer <
  Serializers::SupportSerializer
  attrs :id, :name
  attrs :parent, if: :check_parent
  attrs :organization, if: :check_organiztion

  def parent
    Serializers::Programs::ProgramParentSerializer
      .new(object: object.parent).serializer
  end

  def organization
    Serializers::Organizations::OrganizationsSerializer
      .new(object.organization).serializer
  end

  private
  def check_parent
    object.parent.present?
  end

  def check_organiztion
    object.organization.present?
  end
end
