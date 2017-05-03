class Serializers::Organizations::OrganizationsSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :creator_id, :user_id, :programs, :parent
  attrs :programs, if: :show_program?
  attrs :training_standards, if: :show_program?

  def programs
    Serializers::Organizations::ProgramSerializer
      .new(object: object.programs).serializer
  end

  def training_standards
    Serializers::Organizations::TrainingStandardsSerializer
      .new(object: object.training_standards).serializer
  end

  def parent
    if object.child?
      Serializers::Organizations::SubOrganizationSerializer
        .new(object: object.parent).serializer
    end
  end

  private
  def show_program?
    show_program
  end
end
