class Serializers::Users::UsersSerializer <
  Serializers::SupportSerializer
  attrs :id, :email, :name, :avatar, :trainer_id, :created_at,
    :updated_at, :type

  def type
    object.type
  end
end
