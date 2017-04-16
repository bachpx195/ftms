class Supports::ProgramSupport
  def initialize args = {}
    @program = args[:program]
    @role_support = args[:role_support]
  end

  def users
    @users ||= @program.users
  end

  def statuses
    @statuses ||= Course.statuses
  end

  def languages
    @languages ||= Language.all
  end

  def courses
    @courses ||= @program.courses
  end

  def training_standards
    @training_standards ||= @program.organization.training_standards
  end

  def program_subjects
    @program_subjects ||= @program.program_subjects
  end

  def program_detail
    Serializers::Programs::ProgramDetailSerializer
      .new(object: @program, scope: {supports: self}).serializer
  end

  def owners
    Serializers::Users::UsersSerializer
      .new(object: @role_support.owners).serializer
  end

  def all_roles
    Serializers::Roles::RolesSerializer
      .new(object: @role_support.all_roles).serializer
  end
end
