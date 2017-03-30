class Serializers::Subjects::TasksSerializer < Serializers::SupportSerializer
  attr_accessor :surveys, :assignments, :test_rules

  def surveys
    Serializers::Subjects::SurveysSerializer
      .new(object: object.surveys_not_in_static_task).serializer
  end

  def assignments
    Serializers::Subjects::AssignmentsSerializer
      .new(object: object.assignments_not_in_static_task).serializer
  end

  def test_rules
    Serializers::Subjects::TestRulesSerializer
      .new(object: object.test_rules_not_in_static_task).serializer
  end
end
