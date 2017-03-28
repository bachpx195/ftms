json.extract! organization, :id, :name, :parent_id
if organization.children
  json.sub_organizations organization.children,
    partial: "organizations/sub_organizations", as: :organization
else
  json.sub_organization "null"
end
