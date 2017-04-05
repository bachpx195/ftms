class Serializers::Projects::RequirementsSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :priority, :created_at, :project_id, :creator

  def creator
    object.creator
  end
end
