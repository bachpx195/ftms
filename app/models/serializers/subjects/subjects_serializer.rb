class Serializers::Subjects::SubjectsSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :description, :content, :during_time, :image
  attrs :assignments, :surveys, if: :check_show_tasks?

  def assignments
    Serializers::Subjects::AssignmentsSerializer
      .new(object: object.assignments).serializer
  end

  def surveys
    Serializers::Subjects::SurveysSerializer
      .new(object: object.surveys).serializer
  end

  def image
    Hash[:url, object.image.url]
  end

  private
  def check_show_tasks?
    @show_tasks
  end
end
