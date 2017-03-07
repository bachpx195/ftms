class CourseManager < UserCourse
  include StiRouting

  belongs_to :course
  belongs_to :user
end
