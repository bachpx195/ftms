class Serializers::OrganizationCharts::TrainerSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :avatar

  def avatar
    Hash[:url, object.avatar.url]
  end
end
