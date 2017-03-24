class Serializers::Subjects::UserCourseTasksSerializer <
  Serializers::SupportSerializer
  attr_accessor :surveys, :assignments, :test_rules, :projects

  def surveys
    Serializers::Subjects::SurveysSerializer
      .new(object: object.user.user_tasks(Survey.name),
      scope: {course_subject: course_subject,
        user_id: user_id}).serializer
  end

  def assignments
    Serializers::Subjects::AssignmentsSerializer
      .new(object: object.user.user_tasks(Assignment.name),
      scope: {course_subject: course_subject, user_id: user_id}).serializer
  end

  def test_rules
    Serializers::Subjects::TestRulesSerializer
      .new(object: object.user.user_tasks(TestRule.name),
      scope: {course_subject: course_subject, user_id: user_id}).serializer
  end

  def projects
    Serializers::Subjects::ProjectsSerializer
      .new(object: object.user.user_tasks(Project.name),
      scope: {course_subject: course_subject, user_id: user_id}).serializer
  end
end
