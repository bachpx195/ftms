class ChangeStatusServices::FinishCourseSubject
  def initialize args = {}
    @course_subject = args[:course_subject]
  end

  def perform
    statuses = @course_subject.user_subjects.pluck(:status).uniq
    unless (statuses.include? 'init') || (statuses.include? 'in_progress')
      @course_subject.finished!
    end
  end
end
