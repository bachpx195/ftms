require "rails_helper"

RSpec.describe TraineeTypesController, type: :controller do
  describe "callback" do
    it {should use_before_action(:authenticate_user!)}
    it {should_not use_before_action(:prevent_ssl)}
    it {should use_before_action(:find_trainee_type)}
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
      @trainee_type = Fabricate :trainee_type

      sign_in Fabricate(:user)
    end

    it "assigns @trainee_types" do
      get :index
      expect(assigns :trainee_types).to eq TraineeType.select(:id, :name)
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
    end

    it "params permit" do
      should permit(:name).
        for(:create, params: {params: {trainee_type: @params}})
        .on(:trainee_type)
    end

    it "creates a new trainee_type" do
      expect{
        post :create, params: {trainee_type: @params}
      }.to change(TraineeType,:count).by(1)
    end

    it "responds with JSON" do
      post :create, params: {trainee_type: @params}, format: :json
      response.header["Content-Type"].should include "application/json"
    end

    it "flash message" do
      post :create, params: {trainee_type: @params}, format: :json
      JSON.parse(response.body)["message"]
        .should eq "TraineeType was created successfully!"
    end
  end

  describe "GET #show" do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate(:user)
      @trainee_type = Fabricate :trainee_type

      sign_in @user
      get :show, params: {id: @trainee_type.id}, format: :json
    end

    it "find trainee_type by id" do
      expect(assigns :trainee_type).to eq @trainee_type
    end

    it "responds with JSON" do
      response.header["Content-Type"].should include "application/json"
    end
  end

  describe "PUT #update" do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate(:user)
      @trainee_type = Fabricate :trainee_type

      @params = {
        name: "Update"
      }

      sign_in @user
      put :update, params: {id: @trainee_type.id, trainee_type: @params}, format: :json
      @trainee_type.reload
    end

    it "find trainee_type by id" do
      expect(assigns :trainee_type).to eq @trainee_type
    end

    it {expect(@trainee_type.name).to eq "Update"}

    it "flash message" do
      JSON.parse(response.body)["message"]
        .should eq "TraineeType was updated successfully!"
    end
  end

  describe 'DELETE #destroy' do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate(:user)
      @trainee_type = Fabricate :trainee_type

      sign_in @user
    end

    it "find trainee_type by id" do
      delete :destroy, params: {id: @trainee_type.id}
      expect(assigns :trainee_type).to eq @trainee_type
    end

    it "deletes the trainee_type" do
      expect{
        delete :destroy, params: {id: @trainee_type.id}
      }.to change(TraineeType,:count).by(-1)
    end

    it "flash message" do
      delete :destroy, params: {id: @trainee_type.id}, format: :json
      JSON.parse(response.body)["message"]
        .should eq "TraineeType was deleted successfully!"
    end
  end
end
