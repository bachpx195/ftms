class Serializers::Subjects::SubjectsSerializer <
  Serializers::SupportSerializer
  attrs :id, :name
  attrs :assignments, if: :check_show_tasks?

  def assignments
    Serializers::Subjects::AssignmentsSerializer
      .new(object: object.assignments).serializer
  end

  private
  def check_show_tasks?
    @show_tasks
  end
end
