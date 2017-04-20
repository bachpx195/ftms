class ExamServices::UpdateScore
  def initialize args = {}
    @exam = args[:exam]
  end

  def perform
    @exam.update_attributes score: @exam.results.score,
      spent_time: (Time.now - @exam.started_at) / 60
  end
end
