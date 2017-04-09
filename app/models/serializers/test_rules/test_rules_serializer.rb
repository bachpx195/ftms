class Serializers::TestRules::TestRulesSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :total_question, :time_of_test, :min_score_for_pass,
    :opportunity, :number_of_test
end
