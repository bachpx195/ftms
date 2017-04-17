class Serializers::MoveCourse::SubjectsSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :description, :content, :during_time, :organization_id
end
