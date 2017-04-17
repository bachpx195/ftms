class Supports::TrainingStandardSupport
  def initialize args = {}
    @training_standard = args[:training_standard]
    @params = args[:params]
  end

  def subjects
    @subjects ||= Subject.select :id, :name
  end

  def selected_subjects
    @selected_subjects ||= @training_standard.subjects
  end

  def remain_subjects
    @subjects_remain ||= Subject.find_remain_subjects @selected_subjects.ids
  end

  def organization
    @organization ||= Organization.find_by id: @params[:organization_id]
  end

  def training_standards_serializer
    @training_standards_serializer ||=
      Serializers::TrainingStandards::TrainingStandardsSerializer
        .new(object: @organization.training_standards).serializer
  end

  def training_standard_serializer
    @training_standards_serializer =
      Serializers::TrainingStandards::TrainingStandardsSerializer
        .new(object: training_standard).serializer
  end

  def selected_organizations
    @selected_organizations ||= (Organization.all -
      @training_standard.shared_organizations -
      [@training_standard.organization])
  end
end
