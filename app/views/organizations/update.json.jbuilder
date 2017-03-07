json.message @message
json.organization do
  json.extract! @organization, :name, :id
  json.parent do
    if @organization.child?
      json.extract! @organization.parent, :name, :id
    else
      json.null!
    end
  end
end
