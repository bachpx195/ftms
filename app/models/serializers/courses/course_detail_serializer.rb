class Serializers::Courses::CourseDetailSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :image, :document, :description, :status, :creator_id,
    :language_id, :training_standard_id, :managers, :members,
    :unassigned_users, :start_date, :end_date, :creator, :owner,
    :training_standards, :languages, :evaluation_standards,
    :evaluation_template, :member_evaluations, :course_subjects

  delegate :creator, to: :object

  delegate :owner, to: :object

  def managers
    Serializers::Courses::CourseMembersSerializer
      .new(object: supports.managers, scope: {course: object}).serializer
  end

  def members
    Serializers::Courses::CourseMembersSerializer
      .new(object: supports.members, scope: {course: object}).serializer
  end

  def unassigned_users
    Serializers::Courses::CourseMembersSerializer
      .new(object: supports.unassigned_users).serializer
  end

  def training_standards
    Serializers::TrainingStandards::TrainingStandardsSerializer
      .new(object: supports.training_standards).serializer
  end

  def languages
    Serializers::Languages::LanguagesSerializer
      .new(object: supports.languages).serializer
  end

  def evaluation_standards
    Serializers::Evaluations::EvaluationStandardsSerializer
      .new(object: supports.evaluation_standards).serializer
  end

  def evaluation_template
    Serializers::Evaluations::EvaluationTemplatesSerializer
      .new(object: object.training_standard.evaluation_template).serializer
  end

  def member_evaluations
    Serializers::Evaluations::MemberEvaluationsSerializer
      .new(object: object.member_evaluations).serializer
  end
end
