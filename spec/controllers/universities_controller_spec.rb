require "rails_helper"

RSpec.describe UniversitiesController, type: :controller do
  describe "callback" do
    it {should use_before_action(:authenticate_user!)}
    it {should_not use_before_action(:prevent_ssl)}
    it {should use_before_action(:find_university)}
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
      @university = Fabricate :university

      sign_in Fabricate(:user)
      allow(controller).to receive(:authorize_request).and_return(true)
    end

    it "assigns @universities" do
      get :index
      expect(assigns :universities).to eq Serializers::UniversitiesSerializer
        .new(object: University.all).serializer
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
      @params = {
        name: "Test"
      }

      sign_in Fabricate(:user)
      allow(controller).to receive(:authorize_request).and_return(true)
    end

    it "params permit" do
      should permit(:name).
        for(:create, params: {params: {university: @params}})
        .on(:university)
    end

    it "creates a new university" do
      expect{
        post :create, params: {university: @params}
      }.to change(University,:count).by(1)
    end

    it "responds with JSON" do
      post :create, params: {university: @params}, format: :json
      response.header["Content-Type"].should include "application/json"
    end

    it "flash message" do
      post :create, params: {university: @params}, format: :json
      JSON.parse(response.body)["message"]
        .should eq "University was created successfully!"
    end
  end

  describe "GET #show" do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate(:user)
      @university = Fabricate :university

      sign_in @user
      allow(controller).to receive(:authorize_request).and_return(true)
      get :show, params: {id: @university.id}, format: :json
    end

    it "find university by id" do
      expect(assigns :university).to eq Serializers::UniversitiesSerializer
        .new(object: @university).serializer
    end
  end

  describe "PUT #update" do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate(:user)
      @university = Fabricate :university

      @params = {
        name: "Update"
      }

      sign_in @user
      allow(controller).to receive(:authorize_request).and_return(true)
      put :update, params: {id: @university.id, university: @params},
        format: :json
      @university.reload
    end

    it "find university by id" do
      expect(assigns :university).to eq Serializers::UniversitiesSerializer
        .new(object: @university).serializer
    end

    it {expect(@university.name).to eq "Update"}

    it "flash message" do
      JSON.parse(response.body)["message"]
        .should eq "University was updated successfully!"
    end
  end

  describe 'DELETE #destroy' do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate(:user)
      @university = Fabricate :university

      sign_in @user
      allow(controller).to receive(:authorize_request).and_return(true)
    end

    it "find university by id" do
      delete :destroy, params: {id: @university.id}
      expect(assigns :university).to eq @university
    end

    it "deletes the university" do
      expect{
        delete :destroy, params: {id: @university.id}
      }.to change(University,:count).by(-1)
    end

    it "flash message" do
      JSON.parse(response.body)["message"]
        .should eq "University was deleted successfully!"
    end
  end
end
