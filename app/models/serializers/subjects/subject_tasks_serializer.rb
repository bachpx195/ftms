class Serializers::Subjects::SubjectTasksSerializer <
  Serializers::SupportSerializer
  attrs :surveys, :assignments, :test_rules

  def surveys
    Serializers::Subjects::SurveysSerializer.new(object: object.surveys,
      scope: {owner: object}).serializer
  end

  def assignments
    Serializers::Subjects::AssignmentsSerializer
      .new(object: object.assignments, scope: {owner: object}).serializer
  end

  def test_rules
    Serializers::Subjects::TestRulesSerializer.new(object: object.test_rules,
      scope: {owner: object}).serializer
  end
end
