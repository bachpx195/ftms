json.text program.name
json.id program.id
if program.leaf?
  json.nodes []
  json.parent program.parent ? program.parent.id : "null"
else
  json.parent program.parent ? program.parent.id : "null"
  json.nodes program.children,
    partial: "sub_organizations/sub_program", as: :program
end
