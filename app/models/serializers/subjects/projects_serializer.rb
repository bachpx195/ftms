class Serializers::Subjects::ProjectsSerializer < Serializers::SupportSerializer
  attrs :id, :name
  support_attrs :task_id, if: :owner?

  private
  def owner?
    owner || user_id
  end
end
