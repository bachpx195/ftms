json.program do
  json.extract! @program, :name, :id
  json.parent do
    if @program.child?
      json.extract! @program.parent, :name, :id
    else
      json.null!
    end
  end
end
