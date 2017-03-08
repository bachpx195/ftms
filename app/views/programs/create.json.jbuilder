json.program do
  json.extract! @program, :name, :id
  json.parent do
    if @program.child?
      json.extract! @program.parent, :name, :id
    else
      json.null!
    end
    json.organization do
      if @program.parent.organization
        json.extract! @program.parent.organization, :id, :name
      else
        json.null!
      end
    end
  end
  json.organization do
    if @program.organization
      json.extract! @program.organization, :id, :name
    else
      json.null!
    end
  end
end
