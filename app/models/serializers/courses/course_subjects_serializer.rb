class Serializers::Courses::CourseSubjectsSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :image, :description, :content, :during_time
end
