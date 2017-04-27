class Serializers::Organizations::OrganizationDetailSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :parent_id, :sub_organizations, :owner, :users, :documents,
    :training_standards, :test_rules

  def sub_organization
    Serializers::Organizations::SubOrganizationSerializer
      .new(object: object.children)
  end

  def owner
    Serializers::Users::UsersSerializer.new(object: object.owner).serializer
  end

  def users
    Serializers::Users::UsersSerializer.new(object: object.users).serializer
  end

  def documents
    Serializers::Documents::DocumentsSerializer
      .new(object: object.documents).serializer
  end

  def training_standards
    Serializers::TrainingStandards::TrainingStandardsSerializer
      .new(object: object.training_standards).serializer
  end

  def test_rules
    Serializers::Organizations::TestRulesSerializer
      .new(object: object.test_rules).serializer
  end
end
