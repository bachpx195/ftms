class Serializers::Profiles::TasksSerializer <
  Serializers::SupportSerializer
  attrs :id, :status, :targetable, :meta_tasks

  def targetable
    object.targetable.targetable
  end
end
