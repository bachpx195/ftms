class Serializers::Programs::OrganizationsSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :owner

  delegate :owner, to: :object
end
