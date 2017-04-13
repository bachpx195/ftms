require "rails_helper"

RSpec.describe RolesController, type: :controller do
  describe "callback" do
    it {should use_before_action(:authenticate_user!)}
    it {should_not use_before_action(:prevent_ssl)}
    it {should use_before_action(:find_role)}
    it {should use_before_action(:authorize_class)}
  end

  describe "authenticate user" do
    it "responds unsuccessfully without sign_in" do
      DatabaseCleaner.clean
      get :index
      expect(response).to_not be_success
      expect{raise ("You must sign_in")}.to raise_error(RuntimeError)
    end
  end

  describe "GET #index" do
    before :each do
      DatabaseCleaner.start
      sign_in Fabricate(:user)
      allow(controller).to receive(:authorize_class).and_return(true)
      get :index
    end

    it "assigns @roles" do
      role_parent = Fabricate :role
      role = Fabricate(:role, parent_id: "1")
      expect(assigns :roles).to match_array([role_parent, role])
    end

    it "renders the :index template" do
      expect(response).to render_template(:index)
    end
  end

  describe "GET #show" do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate(:user)
      @function = Fabricate(:function)
      @user.user_functions.create user_id: @user.id, function_id: @function.id
      @role = @user.roles.create name: "role"
      @role_function = @role.role_functions.create function_id: @function.id

      sign_in @user
      allow(controller).to receive(:authorize_class).and_return(true)
      get :show, params: {id: @role.id}, format: :json
    end

    it "find role by id" do
      expect(assigns :role).to eq @role
    end

    it "assigns @function_role" do
      assigns(:function_role).first["role_func_id"]
        .should eq(@role_function.id.to_i)
    end

    it "responds with JSON" do
      response.header["Content-Type"].should include "application/json"
    end
  end

  describe "PUT #update" do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate(:user)
      @role = Fabricate(:role)

      @node_array = "{ \"class\": \"go.TreeModel\",\n  \"nodeDataArray\": \
        [\n{\"key\":#{@role.id},\"name\":\"organization supervior\",
        \"parent\":1}]}"

      sign_in @user
      allow(controller).to receive(:authorize_class).and_return(true)
      put :update, params: {id: @role.id, node_array: @node_array}
      @role.reload
    end

    it {expect(response).to redirect_to(roles_path)}
    it {expect(@role.parent_id).to eql 1}
  end
end
