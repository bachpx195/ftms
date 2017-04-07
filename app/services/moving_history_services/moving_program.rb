class MovingHistoryServices::MovingProgram
  include MovingHistory

  def initialize args
    @user = args[:user]
    @destination = args[:destination]
    @params = args[:params]
  end

  def perform
    if @user.profile.update_attributes program_id: @destination.id
      MovingHistoryServices::MovingProgram.new.create_moving_history @user, @params
    end
  end
end
