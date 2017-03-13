class QueryObject
  def initialize query
    @sql = query.sql
    @connection = ActiveRecord::Base.connection
  end

  def exec
    @connection.exec_query(@sql).to_hash
  end
end
