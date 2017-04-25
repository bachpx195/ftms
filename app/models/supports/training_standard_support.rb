class Supports::TrainingStandardSupport
  def initialize args = {}
    @training_standard = args[:training_standard]
    @params = args[:params]
    @is_shared = args[:params][:is_shared]
  end

  def subjects
    @subjects ||= Subject.select :id, :name
  end

  def standard_subjects
    @standard_subjects ||= @training_standard.subjects
  end

  def remain_subjects
    @subjects_remain ||= Subject.find_remain_subjects @standard_subjects.ids
  end

  def organization
    @organization ||= if @params[:training_standard].present?
      Organization.find_by id: @params[:training_standard][:organization_id]
    else
      @training_standard.organization
    end
  end

  def training_standards_serializer
    @training_standards_serializer ||=
      Serializers::TrainingStandards::TrainingStandardsSerializer
        .new(object: organization.filtered_training_standards(@is_shared))
        .serializer
  end

  def training_standard_serializer
    @training_standards_serializer =
      Serializers::TrainingStandards::TrainingStandardsSerializer
        .new(object: training_standard).serializer
  end

  def standard_organizations
    @standard_organizations ||= (Organization.all -
      @training_standard.shared_organizations -
      [@training_standard.organization])
  end

  def share_with_organization
    @share_with_organization ||= ShareWith.find_by organization: @organization,
      training_standard: @training_standard
  end
end
