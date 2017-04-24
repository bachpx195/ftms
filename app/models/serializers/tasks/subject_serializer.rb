class Serializers::Tasks::SubjectSerializer < Serializers::SupportSerializer
  attrs :id, :name, :image, :description, :during_time

  def image
    Hash[:url, object.image.url]
  end
end
