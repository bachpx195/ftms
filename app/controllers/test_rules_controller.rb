class TestRulesController < ApplicationController
  before_action :load_supports
  before_action :find_test_rule, only: [:show, :update, :destroy]

  def index
  end

  def create
    test_rule = @test_rule_supports.organization.test_rules
      .new test_rule_params
    respond_to do |format|
      format.json do
        if test_rule.save
          render json: {test_rule: Serializers::TestRules::TestRulesSerializer
            .new(object: test_rule).serializer}
        else
          render json: {message: flash_message("not_created"),
            errors: test_rule.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def update
    test_rule = @test_rule_supports.test_rule
    respond_to do |format|
      format.json do
        if test_rule.update_attributes test_rule_params
          render json: {message: flash_message("updated"),
            test_rule: @test_rule_supports.test_rule_serializer}
        else
          render json: {message: flash_message("not_updated"),
            errors: test_rule.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def destroy
    respond_to do |format|
      format.json do
        test_rule = @test_rule_supports.test_rule
        if test_rule.destroy
          render json: {message: flash_message("deleted"),
            test_rule: test_rule}
        else
          render json: {message: flash_message("deleted")}
        end
      end
    end
  end

  private
  def test_rule_params
    params.require(:test_rule).permit TestRule::ATTRIBUTE_PARAMS
  end

  def load_supports
    @test_rule_supports = Supports::TestRuleSupport.new params: params
  end

  def find_test_rule
    unless @test_rule_supports.test_rule
      respond_to do |format|
        format.html{redirect_to test_rules_url}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end
end
