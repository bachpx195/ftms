class Serializers::StaticPages::StaticPagesSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :description, :image, :number_of_trainees,
    :number_of_courses

  def image
    Hash[:url, object.image.url]
  end

  def number_of_trainees
    object.trainees.count
  end

  def number_of_courses
    object.courses.count
  end
end
