json.organizations do
  json.array! @organizations do |organization|
    json.id organization.id
    json.name organization.name
    json.parent do
      if organization.parent
        json.extract! organization.parent, :id, :name
      else
        json.null!
      end
    end
  end
end
