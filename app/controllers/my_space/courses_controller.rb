class MySpace::CoursesController < ApplicationController
  before_action :find_course, only: :show

  def index
    manager_courses = (current_user.manager_courses) +
      (Course.where(owner: current_user).or(Course.where(creator:
      current_user)))
    @course_member_serializer = Serializers::Courses::CoursesSerializer
      .new(object: current_user.member_courses).serializer
    @course_manager_serializer = Serializers::Courses::CoursesSerializer
      .new(object: manager_courses.uniq).serializer
    @courses = Hash.new
    @courses = @courses.merge manager_courses: @course_manager_serializer,
      member_courses: @course_member_serializer
  end

  def show
    @program = @course.program
    @supports = Supports::CourseSupport.new course: @course, program: @program
    respond_to do |format|
      format.html
      format.json do
        render json: {
          course: Serializers::Courses::CourseDetailSerializer
            .new(object: @course, scope: {supports: @supports}).serializer,
          course_subjects: Serializers::Courses::CourseSubjectsSerializer
            .new(object: @supports.course_subjects).serializer
        }
      end
    end
  end

  private
  def find_course
    @course = Course.find_by id: params[:id]
    unless @course
      respond_to do |format|
        format.html{redirect_to my_space_courses_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end
end
