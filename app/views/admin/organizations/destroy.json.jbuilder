json.message @message
json.organizations do
  json.array! @organizations do |organization|
    json.extract! organization, :name, :id
    json.parent do
      if organization.child?
        json.extract! organization.parent, :name, :id
      else
        json.null!
      end
    end
  end
end
