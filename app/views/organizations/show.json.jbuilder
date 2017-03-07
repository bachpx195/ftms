json.parent_organization do
  if @organization.parent
    json.extract! @organization.parent, :id, :name
  else
    json.null!
  end
end
json.programs do
  json.array! @organization.programs do |program|
    json.extract! program, :name, :program_type, :id
  end
end
