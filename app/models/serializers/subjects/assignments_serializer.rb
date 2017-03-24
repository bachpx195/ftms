class Serializers::Subjects::AssignmentsSerializer <
  Serializers::SupportSerializer
  attr_accessor :id, :name, :content
  attr_writer :task_id, if: :owner?

  private
  def owner?
    owner || user_id
  end
end
