class Serializers::TestRules::TestRulesSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :total_question, :time_of_test,
    :min_score_for_pass,
    :opportunity, :number_of_test, :categories, :questions

  def categories
    Serializers::TestRules::TestRulesCategoriesSerializer
      .new(object: object.test_rule_categories).serializer
  end

  def questions
    Serializers::TestRules::TestRulesQuestionsSerializer
      .new(object: object.test_rule_questions).serializer
  end
end
