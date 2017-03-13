class RoleServices::UpdateUserFunction
  def initialize role
    @role = role
  end

  def perform
    @role.user_functions.destroy
    user_ids = @role.users.ids
    function_ids = @role.functions.ids
    data = user_ids.map{|u| function_ids.map{|f| {id: nil, user_id: u.to_i, function_id: f.to_i}}}
    @role.update_attributes user_functions_attributes: data[0]
  end
end
