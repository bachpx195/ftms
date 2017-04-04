class Serializers::Evaluations::MemberEvaluationsSerializer <
  Serializers::SupportSerializer
  attrs :id, :member_id, :manager_id, :total_point, :member_evaluation_items

  def member_evaluation_items
    member_evaluation_items = object.member_evaluation_items
    if member_evaluation_items.present?
      Serializers::Evaluations::MemberEvaluationItemsSerializer
        .new(object: member_evaluation_items).serializer
    else
      Array.new
    end
  end
end
