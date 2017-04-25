class Serializers::Tasks::DynamicTaskSerializer < Serializers::SupportSerializer
  attrs :id, :user

  def user
    Serializers::Users::UserProgramSerializer.new(object: object.user)
      .serializer
  end
end
