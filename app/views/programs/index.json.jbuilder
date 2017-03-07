json.programs do
  json.array! @programs do |program|
    json.id program.id
    json.name program.name
    json.parent do
      if program.parent
        json.extract! program.parent, :id, :name
        json.organization program.parent.organization, :id, :name
      else
        json.null!
      end
    end
    json.organization do
      if program.organization
        json.extract! program.organization, :id, :name
      else
        json.null!
      end
    end
  end
end
