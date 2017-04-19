class ExamServices::UpdateScore
  def initialize args = {}
    @exam = args[:exam]
  end

  def perform
    @exam.update_attributes score: @exam.results.score
  end
end
