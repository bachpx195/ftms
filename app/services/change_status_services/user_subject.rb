class ChangeStatusServices::UserSubject
  def initialize args = {}
    @params = args[:params]
    @user_subject = args[:user_subject]
  end

  def perform
    dynamic_tasks = UserSubjectServices::CreateDynamicTasks.new(
      status: @params[:status], user_subject: @user_subject).perform

    if dynamic_tasks
      @user_subject.attributes = params_with_date
      if @user_subject.save
        ChangeStatusServices::FinishCourseSubject
          .new(course_subject: @user_subject.course_subject).perform
        @user_subject
      else
        false
      end
    else
      false
    end
  end

  private

  def params_with_date
    ChangeStatusServices::ParamsWithDate.new(params: @params,
      user_subject: @user_subject).perform
  end
end
