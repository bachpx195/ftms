class Serializers::TrainingStandards::TrainingStandardsSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :description, :organization_id, :policy
  attrs :organization

  def organization
    Hash[:id, object.organization.id]
  end
end
