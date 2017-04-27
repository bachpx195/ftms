class Serializers::Programs::ProgramsSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :creator
  attrs :parent, if: :check_parent
  attrs :organization, if: :check_organization

  delegate :creator, to: :object

  def parent
    Serializers::Programs::ProgramParentSerializer
      .new(object: object.parent).serializer
  end

  def organization
    Serializers::Programs::OrganizationsSerializer
      .new(object: object.organization).serializer
  end

  private
  def check_parent
    object.parent.present?
  end

  def check_organization
    object.organization.present?
  end
end
