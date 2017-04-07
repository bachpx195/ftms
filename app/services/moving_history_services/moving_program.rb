class MovingHistoryServices::MovingProgram
  include MovingHistoryUtil

  def initialize args = {}
    @user = args[:user]
    @destination = args[:destination]
    @params = args[:params]
  end

  def perform
    if @user.profile.update_attributes program_id: @destination.id
      create_moving_history @user, @params.merge(move_date: Date.today)
    end
  end
end
