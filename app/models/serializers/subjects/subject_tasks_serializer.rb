class Serializers::Subjects::SubjectTasksSerializer <
  Serializers::SupportSerializer
  attrs :surveys, :assignments, :test_rules

  def surveys
    Serializers::Subjects::SurveysSerializer.new(object: static_surveys,
      scope: {owner: ownerable}).serializer
  end

  def assignments
    Serializers::Subjects::AssignmentsSerializer.new(object: static_assignments,
      scope: {owner: ownerable}).serializer
  end

  def test_rules
    Serializers::Subjects::TestRulesSerializer.new(object: static_test_rules,
      scope: {owner: ownerable}).serializer
  end

  private

  def ownerable
    course_subject ? course_subject : object
  end

  %w(surveys assignments test_rules).each do |task|
    define_method "static_#{task}" do
      if course
        course_subject.send "static_#{task}"
      else
        object.send task
      end
    end
  end
end
