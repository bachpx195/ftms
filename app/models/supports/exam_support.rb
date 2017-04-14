class Supports::ExamSupport
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

  def exam
    @exam ||= Exam.find_by id: @params[:id]
  end
end
