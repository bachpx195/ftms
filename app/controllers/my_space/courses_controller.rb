class MySpace::CoursesController < ApplicationController
  def index
    @courses = current_user.courses
    @user_courses = current_user.user_courses
    respond_to do |format|
      format.html {}
      format.json {render json: {courses: @courses, user_courses: @user_courses}}
    end
  end
end
