module MovingHistory
  def create_moving_history user, params
    @moving_history = user.moving_histories.build params
    @moving_history.save ? @moving_history : false
  end
end
