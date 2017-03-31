class Serializers::Subjects::CourseSubjectTasksSerializer <
  Serializers::SupportSerializer
  attrs :surveys, :assignments, :test_rules, :projects

  def surveys
    Serializers::Subjects::SurveysSerializer.new(object: object.static_surveys,
      scope: {owner: object}).serializer
  end

  def assignments
    Serializers::Subjects::AssignmentsSerializer
      .new(object: object.static_assignments,
      scope: {owner: object}).serializer
  end

  def test_rules
    Serializers::Subjects::TestRulesSerializer
      .new(object: object.static_test_rules,
      scope: {owner: object}).serializer
  end

  def projects
    Serializers::Subjects::ProjectsSerializer
      .new(object: object.static_projects).serializer
  end
end
