class Serializers::Subjects::SubjectDetailsSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :content, :description, :during_time, :image,
    :training_standard, :statuses, :task, :subject_task, :documents
  attrs :course_subject_task, :course_subject, :user_subjects,
    :course_subject_teams, :statistics, if: :check_course_subject
  attrs :course_member, :course_managers, :program,
    :organization, if: :check_course

  def image
    Hash[:url, object.image.url]
  end

  def training_standard
    Serializers::Subjects::TrainingStandardSerializer
      .new(object: object.training_standards).serializer
  end

  def statuses
    object.user_subjects.statuses
  end

  def task
    Serializers::Subjects::TasksSerializer
      .new(object: object, scope: {subject_supports: subject_supports})
      .serializer
  end

  def subject_task
    Serializers::Subjects::SubjectTasksSerializer
      .new(object: object).serializer
  end

  def course_member
    Serializers::Subjects::CourseMembersSerializer.new(object:
      courses.course_members.map(&:user)).serializer
  end

  def course_managers
    Serializers::Subjects::CourseManagersSerializer.new(object:
      courses.course_managers.map(&:user)).serializer
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
      .new(object: course_subjects.unassigned_user_subjects,
      scope: {course_subject: course_subjects}).serializer
  end

  def course_subject_teams
    Serializers::Subjects::CourseSubjectTeamsSerializer
      .new(object: course_subjects.teams).serializer
  end

  def documents
    Serializers::Documents::DocumentsSerializer
      .new(object: object.documents).serializer
  end

  def program
    Serializers::Programs::ProgramSubjectsSerializer
      .new(object: courses.program).serializer
  end

  def organization
    Serializers::Organizations::SimpleOrganizationSerializer
      .new(object: courses.program.organization).serializer
  end

  def statistics
    user_subjects = course_subjects.dynamic_tasks.where user_id: current_user
    Serializers::Subjects::StatisticTaskSerializer
      .new(object: object, scope: {user_subjects: user_subjects}).serializer
  end

  private
  def check_course_subject
    course_subjects.present?
  end

  def check_course
    courses.present?
  end
end
