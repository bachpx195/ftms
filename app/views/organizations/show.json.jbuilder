json.organization do
  json.extract! @organization, :id, :name, :parent_id
  json.sub_organizations @organization.children,
    partial: "organizations/sub_organizations", as: :organization
  json.owner @organization.owner
  json.users @organization.users
end
json.programs do
  json.array! @organization.programs do |program|
    json.training_standards program.training_standards
    json.courses program.courses
    json.extract! program, :name, :program_type, :id
    json.courses do
      json.array! program.courses do |course|
        json.extract! course, *Course::ATTRIBUTE_PARAMS, :id
        json.users course.managers, :id, :name, :avatar
      end
    end
  end
end
