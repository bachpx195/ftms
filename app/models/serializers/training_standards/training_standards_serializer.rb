class Serializers::TrainingStandards::TrainingStandardsSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :description, :organization_id, :policy, :subjects
  attrs :share_with_organization

  def organization
    Hash[:id, object.organization.id]
  end

  def subjects
    Serializers::Subjects::SubjectsSerializer
      .new(object: object.subjects, scope: {show_tasks: true}).serializer
  end
end
