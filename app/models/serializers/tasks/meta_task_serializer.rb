class Serializers::Tasks::MetaTaskSerializer < Serializers::SupportSerializer
  attrs :id, :title, :value, :input_type, :dynamic_task, :created_at

  def value
    return object.value if object.input_type == "text"
    Hash[:url, object.value.url]
  end

  def dynamic_task
    Serializers::Tasks::DynamicTaskSerializer.new(object: object.dynamic_task)
      .serializer
  end
end
