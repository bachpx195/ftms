class Serializers::Subjects::UserCourseTasksSerializer <
  Serializers::SupportSerializer
  attrs :surveys, :assignments, :test_rules, :projects

  def surveys
    Serializers::Subjects::SurveysSerializer
      .new(object: object.user.user_tasks(Survey.name, course_subject),
      scope: {course_subject: course_subject, user_id: user_id}).serializer
  end

  def assignments
    Serializers::Subjects::AssignmentsSerializer
      .new(object: object.user.user_tasks(Assignment.name, course_subject),
      scope: {course_subject: course_subject, user_id: user_id}).serializer
  end

  def test_rules
    Serializers::Subjects::TestRulesSerializer
      .new(object: object.user.user_tasks(TestRule.name, course_subject),
      scope: {course_subject: course_subject, user_id: user_id}).serializer
  end

  def projects
    Serializers::Subjects::ProjectsSerializer
      .new(object: object.user.user_tasks(Project.name, course_subject),
      scope: {course_subject: course_subject, user_id: user_id}).serializer
  end
end
