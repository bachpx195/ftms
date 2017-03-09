if organization.children
  json.extract! organization, :id, :name, :parent_id
  json.sub_organizations organization.children, partial: 'organizations/sub_organizations', as: :organization
else
  json.extract! organization, :id, :name, :parent_id
  json.sub_organization "null"
end
