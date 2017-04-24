require "rails_helper"

RSpec.describe TrainingStandardsController, type: :controller do
  describe "callback" do
    it {should use_before_action(:authenticate_user!)}
    it {should_not use_before_action(:prevent_ssl)}
    it {should use_before_action(:find_training_standard)}
    it {should use_before_action(:supports)}
    it {should use_before_action(:find_organization)}
    it {should use_before_action(:authorize_request)}
  end

  describe "authenticate user" do
    it "responds unsuccessfully without sign_in" do
      DatabaseCleaner.clean
      @organization = Fabricate :organization
      get :index, params: {organization_id: @organization.id}

      expect(response).to_not be_success
      expect{raise ("You must sign_in")}.to raise_error(RuntimeError)
    end
  end

  describe "GET #index" do
    before :each do
      DatabaseCleaner.start
      @organization = Fabricate :organization

      sign_in Fabricate(:user)
      allow(controller).to receive(:authorize_request).and_return(true)
    end

    it "assigns @supports" do
      get :index, params: {organization_id: @organization.id}
      expect((assigns :supports).organization).to eq @organization
    end

    it "renders the :index template" do
      get :index, params: {organization_id: @organization.id}
      expect(response).to render_template(:index)
    end

    it "render JSON" do
      get :index, params: {organization_id: @organization.id}, format: :json
      response.header["Content-Type"].should include "application/json"
    end
  end

  describe "POST #create" do
    before :each do
      DatabaseCleaner.start
      @organization = Fabricate :organization
      @params = {
        name: "Test",
        policy: :privated
      }

      sign_in Fabricate(:user)
      allow(controller).to receive(:authorize_request).and_return(true)
    end

    it "params permit" do
      should permit(:name, :description, :program_id, :creator_id,
        :organization_id, :policy)
        .for(:create, params: {params: {organization_id: @organization.id,
          training_standard: @params}})
        .on(:training_standard)
    end

    it "creates a new training_standard" do
      expect{
        post :create, params: {organization_id: @organization.id,
          training_standard: @params}
      }.to change(TrainingStandard,:count).by(1)
    end

    it "redirect to organization when created" do
      post :create, params: {organization_id: @organization.id,
        training_standard: @params}
      should redirect_to(training_standard_path(assigns[:training_standard]))
    end

    it "responds with JSON" do
      post :create, params: {organization_id: @organization.id,
        training_standard: @params}, format: :json
      response.header["Content-Type"].should include "application/json"
    end

    it "flash message" do
      post :create, params: {organization_id: @organization.id,
        training_standard: @params}, format: :json
      JSON.parse(response.body)["message"]
        .should eq "TrainingStandard was created successfully!"
    end
  end

  describe "GET #show" do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate(:user)
      @organization = Fabricate :organization
      @training_standard = Fabricate :training_standard

      sign_in @user
      allow(controller).to receive(:authorize_request).and_return(true)
      get :show, params: {organization_id: @organization.id,
        id: @training_standard.id}
    end

    it "find training_standard by id" do
      expect(assigns :training_standard).to eq @training_standard
    end

    it "renders the :show template" do
      expect(response).to render_template(:show)
    end
  end

  describe "PUT #update" do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate(:user)
      @organization = Fabricate :organization
      @training_standard = Fabricate :training_standard

      @params = {
        name: "Update"
      }

      sign_in @user
      allow(controller).to receive(:authorize_request).and_return(true)
    end

    it "find training_standard by id" do
      put :update, params: {organization_id: @organization.id,
        id: @training_standard.id, training_standard: @params}
      expect(assigns :training_standard).to eq @training_standard
    end

    it "Update successfully" do
      put :update, params: {organization_id: @organization.id,
        id: @training_standard.id, training_standard: @params}
      @training_standard.reload

      expect(@training_standard.name).to eq "Update"
    end

    it "redirect to organization when update" do
      put :update, params: {organization_id: @organization.id,
        id: @training_standard.id, training_standard: @params}
      @training_standard.reload
      should redirect_to(training_standard_path(assigns[:training_standard]))
    end

    it "flash message" do
      put :update, params: {organization_id: @organization.id,
        id: @training_standard.id, training_standard: @params},
        format: :json
      JSON.parse(response.body)["message"]
        .should eq "TrainingStandard was updated successfully!"
    end
  end

  describe 'DELETE #destroy' do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate(:user)
      @organization = Fabricate :organization
      @training_standard = Fabricate :training_standard

      sign_in @user
      allow(controller).to receive(:authorize_request).and_return(true)
    end

    it "find training_standard by id" do
      delete :destroy, params: {organization_id: @organization.id,
        id: @training_standard.id}
      expect(assigns :training_standard).to eq @training_standard
    end

    it "deletes the training_standard" do
      expect{
      delete :destroy, params: {organization_id: @organization.id,
        id: @training_standard.id}
      }.to change(TrainingStandard,:count).by(-1)
    end

    it "flash message" do
      delete :destroy, params: {organization_id: @organization.id,
        id: @training_standard.id}, format: :json
      JSON.parse(response.body)["message"]
        .should eq "TrainingStandard was deleted successfully!"
    end
  end
end
