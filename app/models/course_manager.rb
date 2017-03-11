class CourseManager < UserCourse
  include StiRouting

  belongs_to :user

  has_many :user_subjects, foreign_key: :user_course_id, dependent: :destroy
end
