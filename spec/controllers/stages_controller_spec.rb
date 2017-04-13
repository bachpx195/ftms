require "rails_helper"

RSpec.describe StagesController, type: :controller do
  describe "callback" do
    it {should use_before_action(:authenticate_user!)}
    it {should_not use_before_action(:prevent_ssl)}
    it {should use_before_action(:find_stage)}
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
      @stage = Fabricate :stage

      sign_in Fabricate(:user)
      allow(controller).to receive(:authorize_class).and_return(true)
    end

    it "assigns @stages" do
      get :index
      expect(assigns :stages).to eq Serializers::StagesSerializer
        .new(object: Stage.all).serializer
    end

    it "renders the :index template" do
      get :index
      expect(response).to render_template(:index)
    end

    it "render JSON" do
      get :index, format: :json
      response.header["Content-Type"].should include "application/json"
    end
  end

  describe "POST #create" do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate(:user)
      @params = {
        name: "Test"
      }

      sign_in @user
      allow(controller).to receive(:authorize_class).and_return(true)
    end

    it "params permit" do
      should permit(:name).
        for(:create, params: {params: {stage: @params}})
        .on(:stage)
    end

    it "redirect to stage_path when created" do
      post :create, params: {stage: @params}
      should redirect_to stage_path(id: assigns(:stage)[:id])
    end

    it "creates a new stage" do
      expect{
        post :create, params: {stage: @params}
      }.to change(Stage,:count).by(1)
    end

    it "responds with JSON" do
      post :create, params: {stage: @params}, format: :json
      response.header["Content-Type"].should include "application/json"
    end

    it "flash message" do
      post :create, params: {stage: @params}, format: :json
      JSON.parse(response.body)["message"]
        .should eq "Stage was created successfully!"
    end
  end

  describe "GET #show" do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate(:user)
      @stage = Fabricate :stage

      sign_in @user
      allow(controller).to receive(:authorize_class).and_return(true)
      get :show, params: {id: @stage.id}, format: :json
    end

    it "find stage by id" do
      expect(assigns :stage).to eq Serializers::StagesSerializer
        .new(object: @stage).serializer
    end
  end

  describe "PUT #update" do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate(:user)
      @stage = Fabricate :stage

      @params = {
        name: "Update"
      }

      sign_in @user
      allow(controller).to receive(:authorize_class).and_return(true)
      put :update, params: {id: @stage.id, stage: @params}, format: :json
      @stage.reload
    end

    it "find stage by id" do
      expect(assigns :stage).to eq Serializers::StagesSerializer
        .new(object: @stage).serializer
    end

    it {expect(@stage.name).to eq "Update"}

    it "flash message" do
      JSON.parse(response.body)["message"]
        .should eq "Stage was updated successfully!"
    end
  end

  describe 'DELETE #destroy' do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate(:user)
      @stage = Fabricate :stage

      sign_in @user
      allow(controller).to receive(:authorize_class).and_return(true)
    end

    it "find stage by id" do
      delete :destroy, params: {id: @stage.id}
      expect(assigns :stage).to eq @stage
    end

    it "deletes the stage" do
      expect{
        delete :destroy, params: {id: @stage.id}
      }.to change(Stage,:count).by(-1)
    end

    it "redirect to stage_path when destroy" do
      delete :destroy, params: {id: @stage.id}
      should redirect_to stages_path
    end

    it "flash message" do
      delete :destroy, params: {id: @stage.id}, format: :json
      JSON.parse(response.body)["message"]
        .should eq "Stage was deleted successfully!"
    end
  end
end
