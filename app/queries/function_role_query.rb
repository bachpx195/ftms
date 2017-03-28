class FunctionRoleQuery
  attr_reader :sql

  SQL_QUERY = "select f.id, f.controller_name, f.action, rf.id as role_func_id
   from functions as f
   left outer join (select * from role_functions where role_id = $role_id)
   as rf on f.id = rf.function_id"

  def initialize role_id
    @sql = SQL_QUERY.gsub("$role_id", role_id.to_s)
  end
end
