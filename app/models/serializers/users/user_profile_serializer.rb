class Serializers::Users::UserProfileSerializer <
  Serializers::SupportSerializer
  attrs :user_id, :star_training, :leave_date,
    :finish_training_date, :ready_for_project, :contract_date, :naitei_company,
    :university, :graduation, :language, :trainee_type,
    :user_status, :stage, :organization, :working_day, :program,
    :staff_code, :division, :join_div_date

  def organization
    Serializers::Organizations::OrganizationsSerializer
      .new(object: object.organization).serializer
  end

  def program
    Serializers::Programs::ProgramsSerializer
      .new(object: object.program).serializer
  end

  def university
    Serializers::UniversitiesSerializer
      .new(object: object.university).serializer
  end

  def language
    Serializers::Languages::LanguagesSerializer
      .new(object: object.language).serializer
  end

  def trainee_type
    Serializers::TraineeTypes::TraineeTypesSerializer
      .new(object: object.trainee_type).serializer
  end

  def user_status
    Serializers::UserStatusesSerializer
      .new(object: object.user_status).serializer
  end

  def stage
    Serializers::StagesSerializer
      .new(object: object.stage).serializer
  end
end
