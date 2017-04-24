class Serializers::Profiles::UserSubjectsSerializer <
  Serializers::SupportSerializer
  attrs :id, :subject_name, :status, :start_date, :end_date, :user_end_date,
    :team, :image, :tasks, :evaluations

  delegate :team, to: :object

  def subject_name
    subject.name
  end

  def image
    Hash[:url, subject.image.url]
  end

  def tasks
    tasks = []
    DynamicTask.where(ownerable: object.course_subject,
      user_id: object.user_id).each do |task|
      tasks << Serializers::Profiles::TasksSerializer.new(object: task).serializer
    end
    tasks
  end

  def evaluations
    MemberEvaluation.where member_id: object.user_id, targetable: object.course_subject
  end

  private
  def subject
    object.subject
  end
end
