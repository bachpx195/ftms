json.programs @programs do |program|
  json.extract! program, :id, :name
  json.parent do
    if program.parent
      json.extract! program.parent, :id, :name
      json.organization do
        if program.parent.organization
          json.extract! program.parent.organization, :id, :name
        else
          json.null!
        end
      end
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

json.not_assigned_programs @not_assigned_programs do |program|
  json.extract! program, :id, :name
  json.parent do
    if program.parent
      json.extract! program.parent, :id, :name
      json.organization do
        if program.parent.organization
          json.extract! program.parent.organization, :id, :name
        else
          json.null!
        end
      end
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
