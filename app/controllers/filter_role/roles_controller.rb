class FilterRole::RolesController < ApplicationController
  def index
    @role_support = Supports::FilterRoleSupport.new role_id: params[:role_id]
    render json: {
      owners: Serializers::Users::UsersSerializer
        .new(object: @role_support.owners).serializer,
      all_roles: Serializers::Roles::RolesSerializer
        .new(object: @role_support.all_roles).serializer
    }
  end
end
