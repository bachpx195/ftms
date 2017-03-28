class UserCoursesController < ApplicationController
  before_action :find_user_course

  def show
    @course = @user_course.course
    subjects = @course.subjects
    subjects.each do |subject|
      subject.subject_detail = subject.subject_details params[:id]
    end
    @subjects = subjects.as_json only: [:id, :name, :description,
      :image, :during_time], include: :subject_detail
  end

  private
  def find_user_course
    @user_course = UserCourse.find_by id: params[:id]
    unless @user_course
      respond_to do |format|
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end
end
