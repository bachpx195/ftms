require "rails_helper"

RSpec.describe RoleFunctionsController, type: :controller do
  describe "callback" do
    it {should use_before_action(:authenticate_user!)}
    it {should_not use_before_action(:prevent_ssl)}
    it {should use_before_action(:find_role)}
    it {should use_before_action(:authorize_class)}
  end

  describe "PUT #update" do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate :user
      @function = Fabricate(:function)
      @function_update = Fabricate(:function, humanize_name: "Update")
      @user.user_functions.create user_id: @user.id, function_id: @function.id
      @role = @user.roles.create name: "role"
      @role.role_functions.create function_id: @function.id
      @update = @role.role_functions.create function_id: @function_update.id

      @params = {
        id: @update.id,
        function_id: @function_update.id,
        _destroy: 1
      }

      sign_in @user
      allow(controller).to receive(:authorize_class).and_return(true)
    end

    it "find role by id" do
      put :update, params: {id: @role.id, role_functions_attributes: @params},
        format: :json
      @role.reload
      expect(assigns :role).to eq @role
    end

    it "assigns @function_role" do
      put :update, params: {id: @role.id, role_functions_attributes: @params},
        format: :json
      @role.reload
      expect(assigns(:function_role).
        find{|s| s["id"] == @function_update.id }["role_func_id"]).to eq nil
    end

    it "update successfully" do
      expect{
        put :update, params: {id: @role.id, role_functions_attributes: @params},
          format: :json
      }.to change(RoleFunction,:count).by(-1)
    end

    it "responds with JSON" do
      put :update, params: {id: @role.id, role_functions_attributes: @params},
        format: :json
      response.header["Content-Type"].should include "application/json"
    end

    # it {expect(@stage.name).to eq "Update"}

    # it "flash message" do
    #   JSON.parse(response.body)["message"]
    #     .should eq "Stage was updated successfully!"
    # end
  end
end
