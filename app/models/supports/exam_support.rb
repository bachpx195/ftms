class Supports::ExamSupport
  attr_reader :user

  def initialize args = {}
    @params = args[:params]
    @user = args[:user]
  end

  def organization
    @organization ||= Organization.find_by id: @params[:organization_id]
  end

  def exams
    exams =
      if @params[:organization_id]
        organization.exams
      else
        @user.exams
      end
    Serializers::Exams::ExamsSerializer.new(object: exams).serializer
  end

  def exam_serializer
    Serializers::Exams::ExamSerializer.new(object: exam).serializer
  end

  def exam
    @exam ||= Exam.find_by id: @params[:id]
  end

  def test_rule
    @test_rule ||= TestRule.find_by id: @params[:test_rule_id]
  end

  def course
    @course ||= Course.find_by id: @params[:course_id]
  end

  def course_subject
    @course_subject ||= CourseSubject.find_by id: @params[:course_subject_id]
  end
end
