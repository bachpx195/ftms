class Serializers::Subjects::StatisticTaskSerializer <
  Serializers::SupportSerializer
  attrs :init, :inprogress, :finished, :reject

  def init
    user_subjects.where(status: "init").count
  end

  def inprogress
    user_subjects.where(status: "in_progress").count
  end

  def finished
    user_subjects.where(status: "finish").count
  end

  def reject
    user_subjects.where(status: "reject").count
  end
end
