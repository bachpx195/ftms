class Supports::Statistics::ApplicationStatistic
  def initialize args = {}
    @current_user = args[:current_user]
    @organization_id = args[:organization_id]
    @start_date = args[:start_date] || Date.today - 6.month
    @end_date = args[:end_date] || Date.today
  end

  def organization
    @organization ||= Organization.find_by id: @organization_id
  end
end
