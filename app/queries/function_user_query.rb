class FunctionUserQuery
  SQL_QUERY = "select f.id, f.controller_name, f.action, uf.id as user_func_id from
   functions as f left outer join (select * from user_functions where user_id = $user_id)
   as uf on f.id = uf.function_id"

  def initialize user_id
    @sql = SQL_QUERY.gsub("$user_id", user_id.to_s)
  end

  def sql
    @sql
  end
end
