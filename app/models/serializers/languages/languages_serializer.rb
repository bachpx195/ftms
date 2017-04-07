class Serializers::Languages::LanguagesSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :description, :image

  def image
    Hash[:url, object.image.url]
  end
end
