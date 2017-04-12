class Supports::FilterRoleSupport
  def initialize args = {}
    @role_id = args[:role_id]
  end

  def owners
    @owners ||= role ? role.users : []
  end

  def all_roles
    @all_roles ||= Role.all
  end

  private
  def role
    @role ||= Role.find_by id: @role_id
  end
end
