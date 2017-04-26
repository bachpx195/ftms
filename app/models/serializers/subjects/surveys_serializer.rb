class Serializers::Subjects::SurveysSerializer < Serializers::SupportSerializer
  attrs :id, :name, :content
  attrs :task_id, if: :owner?

  def task_id
    task = Task.find_by targetable: object, ownerable: owner
    task.id if task
  end

  private

  def owner?
    owner || user_id
  end
end
