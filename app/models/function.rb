class Function < ApplicationRecord

  ATTRIBUTE_PARAMS = [:name, :controller_name, :action, :parent_id]

  has_many :role_functions, dependent: :destroy
  has_many :roles, through: :role_functions
  has_many :user_functions, dependent: :destroy
  has_many :users, through: :user_functions

  scope :order_by_parent_id, ->{order parent_id: :ASC}

  class << self
    def functions_with_role role_id
      connection = ActiveRecord::Base.connection
      sql = Settings.sql_function_role.gsub("$role_id", role_id.to_s)
      result = connection.exec_query(sql)
      result.to_hash
    end
  end
end
