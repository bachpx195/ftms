class Supports::MovingHistorySupport
  def initialize args = {}
    @user_organization_id = args[:user_organization_id]
  end

  def organization_moving_histories
    @organization_moving_histories = MovingHistory
      .where organization_id: @user_organization_id
  end

  def moving_history_serializer
    @moving_history_serializer =
      Serializers::MovingHistories::MovingHistoriesSerializer
        .new(object: organization_moving_histories).serializer
  end
end
