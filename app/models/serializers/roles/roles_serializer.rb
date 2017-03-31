class Serializers::Roles::RolesSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :parent_id, :created_at, :updated_at
end
