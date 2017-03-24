class Serializers::Subjects::TestRulesSerializer <
  Serializers::SupportSerializer
  attr_accessor :id, :name
  attr_writer :task_id, if: :owner?

  private
  def owner?
    owner || user_id
  end
end
