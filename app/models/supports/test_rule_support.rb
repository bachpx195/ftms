class Supports::TestRuleSupport
  def initialize args = {}
    @params = args[:params]
  end

  def test_rule
    @test_rule ||= TestRule.find_by id: @params[:id]
  end

  def test_rules_serializer
    Serializers::TestRules::TestRulesSerializer
      .new(object: TestRule.all).serializer
  end
end
