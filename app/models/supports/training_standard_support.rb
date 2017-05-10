class Supports::TrainingStandardSupport
  def initialize args = {}
    @params = args[:params]
    @current_user = args[:current_user]
    @is_shared = args[:params][:is_shared]
  end


  def training_standard
    @training_standard ||= TrainingStandard.find_by id: @params[:id]
  end

  def standard_subjects
    @standard_subjects ||= @training_standard.subjects
  end

  def remain_subjects
    @subjects_remain ||= Subject.find_remain_subjects @standard_subjects.ids
  end

  def organization
    @organization ||= if @params[:training_standard].present? &&
      @params[:training_standard][:organization_id].nil?
      Organization.find_by id: @params[:organization_id]
    elsif @params[:training_standard].present?
      Organization.find_by id: @params[:training_standard][:organization_id]
    elsif @params[:organization_id].present?
      Organization.find_by id: @params[:organization_id]
    else
      training_standard.organization
    end
  end

  def subjects
    @subjects ||= @organization.subjects.select :id, :name, :image,
      :description, :during_time
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
        .new(object: training_standard, scope: {count_organizations: true})
        .serializer
  end

  def standard_organizations
    @standard_organizations ||= (Organization.all -
      training_standard.shared_organizations -
      [training_standard.organization])
  end

  def evaluation_template
    Serializers::TrainingStandards::EvaluationTemplateSerializer
      .new(object: training_standard.evaluation_template).serializer
  end

  def cloneable_organizations
    @cloneable_organizations = Array.new
    if training_standard.publiced? || training_standard.organization
      .owner == @current_user
      @cloneable_organizations = @current_user.organizations
        .where.not id: training_standard.organization_id
    else
      @cloneable_organizations = training_standard.shared_organizations
        .where owner: @current_user
    end
    @cloneable_organizations
  end
end
