class Serializers::Subjects::SubjectsSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :description, :during_time, :image
  attrs :assignments, if: :check_show_tasks?

  def assignments
    Serializers::Subjects::AssignmentsSerializer
      .new(object: object.assignments).serializer
  end

  def image
    Hash[:url, object.image.url]
  end

  private
  def check_show_tasks?
    @show_tasks
  end
end
