class Serializers::Subjects::AssignmentsSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :content
  support_attrs :task_id, if: :owner?

  private
  def owner?
    owner || user_id
  end
end
