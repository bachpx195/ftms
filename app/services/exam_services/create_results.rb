class ExamServices::CreateResults
  def initialize args = {}
    @exam = args[:exam]
  end

  def perform
    return true unless @exam.results.count.zero?
    test_rule = @exam.test_rule
    questions = test_rule.test_rule_questions
    test_rule.test_rule_categories.each do |condition|
      Question.levels.each do |level, _index|
        number_question = condition[:number_question] * condition[level] / 100
        questions += Question.send(level).shuffle.sample(number_question)
      end
    end
    begin
      ActiveRecord::Base.transaction do
        questions.shuffle.each do |question|
          @exam.results.create! question_id: question.id
        end
      end
      true
    rescue
      false
    end
  end
end
