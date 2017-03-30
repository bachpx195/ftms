json.projects @projects do |project|
  json.extract! project, :id, :name, :description
  json.organization project.organization, :name
end
