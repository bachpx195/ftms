class MySpace::CoursesController < ApplicationController
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
end
