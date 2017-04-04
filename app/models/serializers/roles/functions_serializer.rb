class Serializers::Roles::FunctionsSerializer <
  Serializers::SupportSerializer
  attrs :id, :controller_name, :action, :role_func_id, :humanize_name,
    :parent_id, :user_func_id
end
