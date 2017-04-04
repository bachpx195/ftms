class Serializers::Programs::ProgramSubjectsSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :description, :image

  def image
    object.image.url
  end
end
