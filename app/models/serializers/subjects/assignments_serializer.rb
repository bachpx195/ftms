class Serializers::Subjects::AssignmentsSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :content
  attrs :task_id, if: :owner?
  attrs :meta_types

  def meta_types
    return Array.new unless check_user_assignment?
    Serializers::Subjects::MetaTypesSerializer
      .new(object: object.meta_types).serializer
  end

  def task_id
    task = Task.find_by targetable: object, ownerable: owner
    task.id if task
  end

  private

  def owner?
    owner || user_id
  end

  def check_user_assignment?
    object.meta_types.present?
  end
end
