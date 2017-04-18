class TrainingStandardServices::CloneTrainingStandard
  def initialize args = {}
    @training_standard_id = args[:training_standard_id]
    @organization_id = args[:organization_id]
  end

  def clone
    begin
      TrainingStandard.transaction do
        old_training_standard = TrainingStandard.find_by id: @training_standard_id
        target_organization = Organization.find_by id: @organization_id

        cloned_training_standard =
          clone_training_standard old_training_standard, target_organization

        clone_evaluation_template old_training_standard.evaluation_template,
          target_organization, cloned_training_standard

        old_training_standard.subjects.each do |old_subject|
          cloned_subject = clone_subject target_organization, old_subject
          StandardSubject.create subject: cloned_subject,
            training_standard: cloned_training_standard

          old_subject.assignments.each do |old_assignment|
            clone_assignment target_organization, old_subject,
              cloned_subject, old_assignment
          end

          old_subject.surveys.each do |old_survey|
            clone_survey target_organization, old_subject,
              cloned_subject, old_survey
          end

          old_subject.test_rules.each do |old_test_rule|
            clone_test_rule target_organization, old_subject,
              cloned_subject, old_test_rule
          end

          old_subject.documents.each do |old_document|
            clone_document old_subject, cloned_subject, old_document
          end
        end

        cloned_training_standard
      end
    rescue
      nil
    end
  end

  private

  def clone_training_standard old_training_standard, target_organization
    TrainingStandard.create old_training_standard.attributes
      .merge({organization_id: @organization_id,
        creator_id: target_organization.user_id, id: nil})
  end

  def clone_evaluation_template old_evaluation_template, target_organization, cloned_training_standard
    cloned_evaluation_template =
      EvaluationTemplate.create old_evaluation_template
        .attributes.merge({training_standard_id: cloned_training_standard.id,
          creator_id: target_organization.user_id, id: nil})

    old_evaluation_template.evaluation_standards.each do |evaluation_standard|
      EvaluationStandard.create evaluation_standard.attributes
        .merge({evaluation_template_id: cloned_evaluation_template.id,
          creator_id: target_organization.user_id, id: nil})
    end
  end

  def clone_subject target_organization, old_subject
    cloned_subject = Subject.create old_subject.attributes
      .merge({organization_id: @organization_id,
        creator_id: target_organization.user_id, id: nil})

    cloned_subject.image = File.open(old_subject.image.file.file)
    cloned_subject.save
    cloned_subject
  end

  def clone_assignment target_organization, old_subject, cloned_subject, old_assignment
    cloned_assignment = Assignment.create old_assignment.attributes
      .merge({organization_id: @organization_id,
        creator_id: target_organization.user_id, id: nil})
    StaticTask.create ownerable: cloned_subject, targetable: cloned_assignment
  end

  def clone_survey target_organization, old_subject, cloned_subject, old_survey
    cloned_survey = Survey.create old_survey.attributes
      .merge({organization_id: @organization_id,
        creator_id: target_organization.user_id, id: nil})
    StaticTask.create ownerable: cloned_subject, targetable: cloned_survey
  end

  def clone_test_rule target_organization, old_subject, cloned_subject, old_test_rule
    cloned_test_rule = TestRule.create old_test_rule.attributes
      .merge({organization_id: @organization_id,
        creator_id: target_organization.user_id, id: nil})
    StaticTask.create ownerable: cloned_subject, targetable: cloned_test_rule

    old_test_rule.test_rule_questions.each do |test_rule_question|
      TestRuleQuestion.create test_rule_question.attributes
        .merge({test_rule_id: cloned_test_rule.id, id: nil})
    end

    old_test_rule.test_rule_categories.each do |test_rule_category|
      TestRuleCategory.create test_rule_category.attributes
        .merge({test_rule_id: cloned_test_rule.id, id: nil})
    end
  end

  def clone_document old_subject, cloned_subject, old_document
    cloned_document = Document.create old_document.attributes
      .merge({documentable: cloned_subject, id: nil})

    cloned_document.file = File.open(old_document.file.file.file)
    cloned_document.save
    cloned_document
  end
end
