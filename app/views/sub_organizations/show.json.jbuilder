json.programs_of_org do 
  json.array! @programs_of_org do |program|
    json.text program.name
    json.id program.id
    json.parent program.parent ? program.parent.id : "null"
    json.nodes program.children, partial: "sub_organizations/sub_program", as: :program
  end
end
