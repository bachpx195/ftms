class Serializers::Subjects::UserSubjectsSerializer <
  Serializers::SupportSerializer
  attrs :id, :user_id, :user_course_id, :current_progress, :user_end_date,
    :start_date, :end_date, :status, :user_name, :user_avatar, :subject_id
  attrs :user_course_task, if: :course_subject?

  def user_name
    object.user.name
  end

  def user_avatar
    Hash[:url, object.user.avatar.url]
  end

  def user_course_task
    Serializers::Subjects::UserCourseTasksSerializer.new(object: object,
      scope: {course_subject: course_subject,
        user_id: object.user.id}).serializer
  end

  private
  def course_subject?
    course_subject.present?
  end
end
