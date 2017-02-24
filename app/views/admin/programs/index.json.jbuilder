json.programs do
  json.array! @programs do |program|
    json.id program.id
    json.name program.name
    program.parent ? (json.parent_name program.parent.name) : (json.parent_name '')
  end
end
