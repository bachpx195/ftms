class Serializers::Courses::CourseSubjectsSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :image, :description, :content, :during_time

  def image
    Hash[:url, object.image.url]
  end
end
