class FunctionUserWithRoleQuery
  SQL_HAS_ROLE_QUERY = "select f.id, f.controller_name, f.action, rf.id as user_func_id from
   functions as f left outer join (select * from role_functions where role_id in ($roles)
   group by function_id) as rf on f.id = rf.function_id"

  SQL_NO_ROLE_QUERY = "select f.id, f.controller_name, f.action,
   null as user_func_id from functions as f where 1"

  def initialize role_ids
    if role_ids.join(",").blank?
      @sql = SQL_NO_ROLE_QUERY
    else
      @sql = SQL_HAS_ROLE_QUERY.gsub("$roles", role_ids.join(","))
    end
  end

  def sql
    @sql
  end
end
