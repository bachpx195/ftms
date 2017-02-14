json.program do
  json.extract! @program, :name, :program_type
  json.organization @program.organization, :name
  json.parent do
    if @program.child?
      json.extract! @program.parent, :name, :program_type
      json.organization @program.organization, :name
    else
      json.null!
    end
  end
  json.children @program.children, :name, :program_type
end
