json.project @project
json.organizations @organizations, :id, :name
json.requirements @project.requirements do |requirement|
  json.extract! requirement, :name, :priority, :created_at, :id, :project_id
  json.creator requirement.creator
end
