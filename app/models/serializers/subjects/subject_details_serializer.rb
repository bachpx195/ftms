class Serializers::Subjects::SubjectDetailsSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :content, :description, :during_time, :image,
    :training_standard, :statuses, :tasks, :remain_tasks, :documents, :projects
  attrs :course_subject_task, :course_subject, :user_subjects, :user_subject,
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

  def remain_tasks
    Serializers::Subjects::TasksSerializer
      .new(object: object, scope: {subject_supports: subject_supports})
      .serializer
  end

  def tasks
    Serializers::Subjects::SubjectTasksSerializer
      .new(object: object, scope: {course_subject: course_subjects,
      course: course}).serializer
  end

  def course_member
    Serializers::Subjects::CourseMembersSerializer.new(object:
      course.course_members.map(&:user)).serializer
  end

  def course_managers
    Serializers::Subjects::CourseManagersSerializer.new(object:
      course.course_managers.map(&:user)).serializer
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

  def user_subject
    Serializers::Subjects::UserSubjectsSerializer
      .new(object: current_user_subject).serializer
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
      .new(object: course.program).serializer
  end

  def organization
    Serializers::Organizations::SimpleOrganizationSerializer
      .new(object: course.program.organization).serializer
  end

  def statistics
    if current_user && course_subjects
      user_subjects = course_subjects.dynamic_tasks.where objectable: current_user
      Serializers::Subjects::StatisticTaskSerializer
        .new(object: object, scope: {user_subjects: user_subjects}).serializer
    end
  end

  def user_task
    current_user.dynamic_tasks
  end

  def projects
    course_subjects.team_projects if course_subjects
  end

  private
  def check_course_subject
    course_subjects.present?
  end

  def check_course
    course.present?
  end

  def current_user?
    current_user.present?
  end

  def current_user_subject
    user_course = UserCourse.find_by user: current_user, course: course
    current_user.user_subjects.where(user_course: user_course,
      subject_id: object.id).first
  end
end
