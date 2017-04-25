require "rails_helper"

RSpec.describe UsersController, type: :controller do
  describe "callback" do
    it {should use_before_action(:authenticate_user!)}
    it {should_not use_before_action(:prevent_ssl)}
    it {should use_before_action(:load_supports)}
    it {should use_before_action(:find_organization)}
    it {should use_before_action(:find_user)}
    it {should use_before_action(:authorize_request)}
  end

  describe "authenticate user" do
    it "responds unsuccessfully without sign_in" do
      DatabaseCleaner.clean
      organization = Fabricate :organization
      get :index, params: {organization_id: organization.id}
      expect(response).to_not be_success
      expect{raise ("You must sign_in")}.to raise_error(RuntimeError)
    end
  end

  describe "view object" do
     before :each do
      DatabaseCleaner.start
      @organization = Fabricate :organization
      sign_in Fabricate(:user)
      allow(controller).to receive(:authorize_request).and_return(true)

      get :index, params: {organization_id: @organization.id}, format: :json
    end

    it "assigns @user_supports" do
      expect((assigns :user_supports).organization).to eq @organization
    end
  end

  describe "GET #index" do
    before :each do
      DatabaseCleaner.start
      organization = Fabricate :organization
      sign_in Fabricate(:user)
      allow(controller).to receive(:authorize_request).and_return(true)

      get :index, params: {organization_id: organization.id}, format: :json
    end

    it "render JSON" do
      response.header["Content-Type"].should include "application/json"
    end
  end

  describe "GET #new" do
    before :each do
      DatabaseCleaner.start
      organization = Fabricate :organization
      sign_in Fabricate(:user)
      allow(controller).to receive(:authorize_request).and_return(true)

      get :new, params: {organization_id: organization.id}
    end

    it "render new template" do
      expect(response).to render_template(:new)
    end
  end

  describe "POST #create" do
    before :each do
      DatabaseCleaner.start
      @organization = Fabricate :organization
      @file = fixture_file_upload("files/test.png", "text/png")
      @params = {
        name: "Test",
        email: "example2@email.com",
        password: "12345678",
        password_confirmation: "12345678",
        avatar: @file
      }

      Fabricate(:role, name: "trainee")
      sign_in Fabricate(:user)
      allow(controller).to receive(:authorize_request).and_return(true)
    end

    it "params permit" do
      should permit(:name, :email, :password, :password_confirmation,
        :avatar, :trainer_id, profile_attributes: Profile::ATTRIBUTES_PARAMS ).
        for(:create, params: {params: {organization_id: @organization.id,
          user: @params}}, format: :json)
        .on(:user)
    end

    it "creates a new user" do
      expect{
        post :create, params:{organization_id: @organization.id, user: @params},
        format: :json
      }.to change(User, :count).by(1)
    end

    it "responds with JSON" do
      post :create, params: {organization_id: @organization.id,
        user: @params}, format: :json
      response.header["Content-Type"].should include "application/json"
    end

    it "flash message" do
      post :create, params: {organization_id: @organization.id, user: @params},
        format: :json
      JSON.parse(response.body)["message"]
        .should eq "User was created successfully!"
    end
  end

  describe "GET #show" do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate(:user)

      sign_in @user
      allow(controller).to receive(:authorize_request).and_return(true)
      get :show, params: {id: @user.id}, format: :json
    end

    it "find user by id" do
      expect((assigns :user_supports).user).to eq @user
    end

    it "responds with JSON" do
      response.header["Content-Type"].should include "application/json"
    end
  end

  describe "GET #edit" do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate(:user)

      sign_in @user
      allow(controller).to receive(:authorize_request).and_return(true)
      get :edit, params: {id: @user.id}
    end

    it "find user by id" do
      expect((assigns :user_supports).user).to eq @user
    end

    it "render edit template" do
      expect(response).to render_template(:edit)
    end
  end

  describe "PATCH #update" do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate :user
      @organization = Fabricate :organization
      @params = {
        name: "Update",
        email: "chu.anh.tuan@framgia.com"
      }

      Fabricate(:role, name: "trainee")
      sign_in @user
      allow(controller).to receive(:authorize_request).and_return(true)
    end

    it "find user by id" do
      put :update, params: {id: @user.id,
        organization_id: @organization.id, user: @params}
      expect((assigns :user_supports).user).to eq @user
    end

    it "Updated successfully" do
      put :update, params: {id: @user.id,
        organization_id: @organization.id, user: @params},format: :json
      @user.reload
      expect(@user.name).to eq "Update"
    end

    it "flash message" do
      put :update, params: {id: @user.id,
        organization_id: @organization.id, user: @params}, format: :json
      JSON.parse(response.body)["message"]
        .should eq "User was updated successfully!"
    end
  end

  describe 'DELETE #destroy' do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate :user
      @organization = Fabricate :organization

      sign_in @user
      allow(controller).to receive(:authorize_request).and_return(true)
    end

    it "deletes the user" do
      expect{
        delete :destroy, params: {id: @user.id,
          organization_id: @organization.id}, format: :json
      }.to change(User,:count).by(-1)
    end

    it "flash message" do
      delete :destroy, params: {id: @user.id,
        organization_id: @organization.id}, format: :json
      JSON.parse(response.body)["message"]
        .should eq "User was deleted successfully!"
    end
  end
end
