class Serializers::Programs::OrganizationsSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :owner, :user_id, :creator_id

  delegate :owner, to: :object
end
