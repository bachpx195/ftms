class Serializers::Organizations::SimpleOrganizationSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :creator_id, :programs, :user_id
end
