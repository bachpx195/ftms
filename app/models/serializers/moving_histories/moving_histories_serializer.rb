class Serializers::MovingHistories::MovingHistoriesSerializer <
  Serializers::SupportSerializer
  attrs :id, :move_date, :user_id, :user_name, :organization_name,
    :source_name, :destination_name

  delegate :user_name, to: :object
  delegate :organization_name, to: :object
  delegate :source_name, to: :object
  delegate :destination_name, to: :object
end
