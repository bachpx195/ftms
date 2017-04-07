class Supports::MoveUserSupport
  def initialize args = {}
    @params = args[:params]
  end

  def user
    @user ||= User.find_by id: @params[:user_id]
  end

  def source
    source_type = @params[:sourceable_type]
    if source_type
      @source = source_type.classify.constantize.find_by id:
        @params[:sourceable_id]
    end
  end

  def destination
    destination_type = @params[:destinationable_type]
    if destination_type
      @destination = destination_type.classify.constantize.find_by id:
        @params[:destinationable_id]
    end
  end

  def user_serializer
    @user_serializer = Serializers::Users::UsersSerializer
      .new(object: user).serializer
  end
end
