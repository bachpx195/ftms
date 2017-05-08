class Serializers::TrainingStandards::TrainingStandardsSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :description, :organization, :policy, :subjects, :creator_id
  attrs :share_with_organization
  attrs :organizations, if: :count_organizations?

  def organization
    Hash id: object.organization.id, user_id: object.organization.user_id
  end

  def subjects
    Serializers::Subjects::SubjectsSerializer
      .new(object: object.subjects, scope: {show_tasks: true}).serializer
  end

  def organizations
    Serializers::TrainingStandards::OrganizationsSerializer
      .new(object: object.shared_organizations).serializer
  end

  private
  def count_organizations?
    @count_organizations.present?
  end
end
