class Serializers::Organizations::TrainingStandardsSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :creator_id, :description, :policy, :organization_id
end
