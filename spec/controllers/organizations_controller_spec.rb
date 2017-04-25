require "rails_helper"

RSpec.describe OrganizationsController, type: :controller do
  describe "callback" do
    it {should use_before_action(:authenticate_user!)}
    it {should_not use_before_action(:prevent_ssl)}
    it {should use_before_action(:find_organization)}
    it {should use_before_action(:authorize_request)}
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
      @user = Fabricate :user
      @organization = @user.organizations.create name: "organization"
      @organizations  =  Serializers::Organizations::OrganizationsSerializer
        .new(object: @organization, scope: {show_program: true}).serializer

      sign_in @user
      allow(controller).to receive(:authorize_request).and_return(true)
    end

    it "assigns @organizations" do
      get :index
      expect(assigns(:organizations).first)
        .to eq @organizations
    end

    it "renders the :index template" do
      get :index
      expect(response).to render_template(:index)
    end
  end

  describe "GET #new" do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate :user

      sign_in @user
      allow(controller).to receive(:authorize_request).and_return(true)
    end

    it "renders the :index template" do
      get :new
      expect(response).to render_template(:new)
    end
  end

  describe "POST #create" do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate :user

      @params = {
        name: "Organizations"
      }

      sign_in @user
      allow(controller).to receive(:authorize_request).and_return(true)
    end

    it "param pemit" do
      should permit(:name, :parent_id, :user_id)
        .for(:create, params: {params: {organization: @params}, format: :json})
        .on(:organization)
    end

    it "creates a new organization" do
      expect{
        post :create, params: {organization: @params}
      }.to change(Organization,:count).by(1)
    end

    it "redirect to organization when created" do
      post :create, params: {organization: @params}
      should redirect_to(organization_path(assigns[:organization]))
    end

    it "responds with JSON" do
      post :create, params: {organization: @params}, format: :json
      response.header["Content-Type"].should include "application/json"
    end

    it "flash message" do
      post :create, params: {organization: @params},
        format: :json
      JSON.parse(response.body)["message"]
        .should eq "Organization was created successfully!"
    end
  end

  describe "GET #show" do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate :user
      @organization = Fabricate :organization

      @params = {
        name: "Updated"
      }

      sign_in @user
      allow(controller).to receive(:authorize_request).and_return(true)
      get :show, params: {id: @organization.id}
    end

    it "find organization" do
      expect(assigns :organization).to eq @organization
    end

    it "assigns view object @organization_supports" do
      expect((assigns :organization_supports).organization)
        .to eq Serializers::Organizations::OrganizationDetailSerializer
        .new(object: @organization).serializer
    end

    it "renders the :show template" do
      expect(response).to render_template(:show)
    end
  end

  describe "PUT #update" do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate :user
      @organization = Fabricate :organization
      @params = {
        name: "Updated"
      }

      sign_in @user
      allow(controller).to receive(:authorize_request).and_return(true)
    end

    it "find organization" do
      put :update, params: {id: @organization.id, organization: @params}
      expect(assigns :organization).to eq @organization
    end

    it "update successfully" do
      put :update, params: {id: @organization.id, organization: @params}
      @organization.reload
      expect(@organization.name).to eq "Updated"
    end

    it "flash message" do
      put :update, params: {id: @organization.id, organization: @params},
        format: :json
      JSON.parse(response.body)["message"]
        .should eq "Organization was updated successfully!"
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

    it "find organization by id" do
      delete :destroy, params: {id: @organization.id}, format: :json
      expect(assigns :organization).to eq @organization
    end

    it "deletes the organization" do
      expect{
        delete :destroy, params: {id: @organization.id}, format: :json
      }.to change(Organization,:count).by(-1)
    end

    it "flash message" do
      delete :destroy, params: {id: @organization.id}, format: :json
      JSON.parse(response.body)["message"]
        .should eq "Organization was deleted successfully!"
    end
  end
end
