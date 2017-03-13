json.organization do
  json.extract! @organization, :id, :name, :parent_id
  json.sub_organizations @organization.children, partial: 'organizations/sub_organizations', as: :organization
end
json.programs do
  json.array! @organization.programs do |program|
    json.extract! program, :name, :program_type, :id
    json.courses do
      json.array! program.courses do |course|
        json.extract! course, *Course::ATTRIBUTE_PARAMS, :id
        json.users do
          json.array! course.trainers do |user|
            json.extract! user, :id , :name, :avatar
          end
        end
      end
    end
  end
end
