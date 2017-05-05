class ChangeStatusServices::ChangeStatuses
  def initialize args = {}
    @params = args[:params]
    @user_subjects = args[:user_subjects]
    @course_subject = args[:course_subject]
  end

  def perform
    UserSubject.transaction do
      begin
        status = user_subject_params[:status]
        @user_subjects.each do |user_subject|
          create_dynamic_tasks = UserSubjectServices::CreateDynamicTasks
            .new status: status, user_subject: user_subject
          result = create_dynamic_tasks.perform
          statuses = UserSubject.statuses
          if result && statuses[user_subject.status] < statuses[status] &&
            statuses[user_subject.status] < statuses["finished"]

            user_subject.update_attributes! params_with_date(user_subject)
          end
        end
        update_course_subject_status
        @user_subjects
      rescue
        false
      end
    end
  end

  private
  def user_subject_params
    @params.require(:user_subject).permit :status
  end

  def params_with_date user_subject
    ChangeStatusServices::ParamsWithDate
      .new(params: user_subject_params, user_subject: user_subject).perform
  end

  def update_course_subject_status
    if @params[:object_type] == "CourseSubject"
      @course_subject.update_attributes! user_subject_params
    elsif @params[:object_type] == "Team"
      if @course_subject.init?
        @course_subject.in_progress!
      end
      ChangeStatusServices::FinishCourseSubject
        .new(course_subject: @course_subject).perform
    end
  end
end
