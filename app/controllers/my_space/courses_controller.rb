class MySpace::CoursesController < ApplicationController
  def index
    member_courses = current_user.member_courses.includes :owner, :creator,
      :members, :managers, program: [:organization],
      training_standard: :subjects
    manager_courses = current_user.manager_courses.includes :owner, :creator,
      :members, :managers, program: [:organization],
      training_standard: :subjects
    @course_member_serializer = Serializers::Courses::CoursesSerializer
      .new(object: member_courses).serializer
    @course_manager_serializer = Serializers::Courses::CoursesSerializer
      .new(object: manager_courses).serializer
    @courses = Hash.new
    @courses = @courses.merge manager_courses: @course_manager_serializer,
      member_courses: @course_member_serializer
  end
end
