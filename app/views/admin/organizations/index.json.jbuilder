json.organizations do
  json.array! @organizations do |organization|
    json.id organization.id
    json.name organization.name
    organization.parent ? (json.parent_name organization.parent.name) : (json.parent_name '')
  end
end
