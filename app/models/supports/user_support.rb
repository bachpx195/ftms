class Supports::UserSupport
  def initialize args = {}
    @params = args[:params]
  end

  def user
    @user ||= User.find_by id: @params[:id]
  end

  def program
    @program ||= Program.find_by id: @params[:program_id]
  end

  def organization
    @organization ||=
      if program
        program.organization
      elsif @params[:organization_id]
        Organization.find_by id: @params[:organization_id]
      else
        @user.profile.organization
      end
  end

  def organization_chart
    @organization_chart ||= Serializers::OrganizationChartSerializer
      .new(object: organization).serializer
  end

  def users_serializer
    @users_serializer ||= Serializers::Users::UsersSerializer
      .new(object: organization.users).serializer
  end

  def user_serializer
    @user_serializer ||= Serializers::Users::UsersSerializer
      .new(object: user).serializer
  end

  %w(organizations programs roles universities trainee_types languages
    user_statuses stages).each do |method|
    define_method method do
      unless instance_variable_get "@#{method}"
        instance_variable_set "@#{method}", method.classify.constantize.all
      end
      instance_variable_get "@#{method}"
    end
  end

  def stage
    @stage ||= Stage.find_by name: "In Education"
  end

  def current_organization_trainers
    @current_organization_trainers ||=
      if organization
        organization.users.where id: UserRole.trainer_ids
      else
        user.profile.organization.users.where id: UserRole.trainer_ids
      end
  end

  def current_organization_programs
    unless @params[:program_id]
      @current_organization_programs ||=
        if organization
          organization.programs
        else
          user.profile.organization.programs
        end
    end
  end
end
