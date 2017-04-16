class Serializers::TrainingStandards::TrainingStandardsSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :description
  attrs :organization

  def organization
    Hash[:id, object.organization.id]
  end
end
