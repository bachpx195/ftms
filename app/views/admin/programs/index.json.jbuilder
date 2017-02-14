json.programs do
  json.array! @programs do |program|
    json.extract! program, :name, :program_type
    json.organization program.organization, :name
  end
end
