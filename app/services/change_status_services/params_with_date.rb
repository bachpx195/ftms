class ChangeStatusServices::ParamsWithDate
  def initialize args = {}
    @params = args[:params]
    @user_subject = args[:user_subject]
  end

  def perform
    status = @params[:status]
    today = Date.today
    params = if (status == "in_progress") && !@user_subject.in_progress?
      @params.merge start_date: today, end_date: today +
        @user_subject.subject.during_time.days
    elsif (status == "finished" || status == "reject") &&
      (@user_subject.in_progress? || @user_subject.init?)
      @params.merge user_end_date: today
    else
      @params
    end
  end
end
