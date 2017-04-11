class Serializers::Teams::TeamDetailsSerializer <
  Serializers::SupportSerializer
  attrs :subject_detail, :statuses, :task, :course_subject_task,
    :course_subject, :user_subjects, :team_task

  def subject_detail
    Serializers::Teams::SubjectDetailsSerializer
      .new(object: object.course_subject.subject).serializer
  end

  def statuses
    UserSubject.statuses
  end

  def task
    Serializers::Teams::TasksSerializer
      .new(object: object, scope: {team_supports: @team_supports})
      .serializer
  end

  def team_task
    Serializers::Teams::TeamTasksSerializer
      .new(object: object).serializer
  end

  def course_subject_task
    Serializers::Subjects::CourseSubjectTasksSerializer
      .new(object: course_subjects).serializer
  end

  def course_subject
    Serializers::Subjects::CourseSubjectsSerializer
      .new(object: course_subjects).serializer
  end

  def user_subjects
    Serializers::Subjects::UserSubjectsSerializer
      .new(object: object.user_subjects,
        scope: {course_subject: course_subjects}).serializer
  end
end
