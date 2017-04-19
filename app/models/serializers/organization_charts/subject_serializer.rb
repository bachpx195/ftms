class Serializers::OrganizationCharts::SubjectSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :image, :trainees

  def image
    Hash[:url, object.image.url]
  end

  def trainees
    Hash.new
  end
end
