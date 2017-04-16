class Supports::Statistics::ApplicationStatistic
  def initialize args = {}
    @current_user = args[:current_user]
    @organization_id = args[:organization_id]
  end

  def organization
    @organization ||= Organization.find_by id: @organization_id
  end
end
