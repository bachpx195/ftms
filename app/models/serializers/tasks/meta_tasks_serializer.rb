class Serializers::Tasks::MetaTasksSerializer < Serializers::SupportSerializer
  attrs :id, :title, :value, :input_type, :dynamic_task, :created_at

  def value
    return object.value if object.input_type == "text"
    Hash[:url, object.value.url]
  end
end
