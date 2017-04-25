require "rails_helper"

RSpec.describe LanguagesController, type: :controller do
  describe "callback" do
    it {should use_before_action(:authenticate_user!)}
    it {should_not use_before_action(:prevent_ssl)}
    it {should use_before_action(:find_language)}
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
      @language = Fabricate :language
      @languages = Language.select :id, :name, :image,
        :description, :creator_id

      sign_in Fabricate(:user)
      allow(controller).to receive(:authorize_request).and_return(true)
    end

    it "assigns @languages" do
      get :index
      expect(assigns :languages).to eq @languages
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
      @file = fixture_file_upload("files/test.png", "text/png")
      @params = {
        name: "Test",
        image: @file,
        description: "this is a description"
      }

      sign_in Fabricate(:user)
      allow(controller).to receive(:authorize_request).and_return(true)
    end

    it "params permit" do
      should permit(:name).
        for(:create, params: {params: {language: @params}})
        .on(:language)
    end

    it "creates a new language" do
      expect{
        post :create, params: {language: @params}
      }.to change(Language,:count).by(1)
    end

    it "responds with JSON" do
      post :create, params: {language: @params}, format: :json
      response.header["Content-Type"].should include "application/json"
    end

    it "flash message" do
      post :create, params: {language: @params}, format: :json
      JSON.parse(response.body)["message"]
        .should eq "Language was created successfully!"
    end
  end

  describe "GET #show" do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate(:user)
      @language = Fabricate :language

      sign_in @user
      allow(controller).to receive(:authorize_request).and_return(true)
      get :show, params: {id: @language.id}, format: :json
    end

    it "find language by id" do
      expect(assigns :language).to eq @language
    end

    it "responds with JSON" do
      response.header["Content-Type"].should include "application/json"
    end
  end

  describe "PUT #update" do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate(:user)
      @language = Fabricate :language

      @file = fixture_file_upload("files/test.png", "text/png")
      @params = {
        name: "Update",
        image: @file,
        description: "this is a update description"
      }

      sign_in @user
      allow(controller).to receive(:authorize_request).and_return(true)
      put :update, params: {id: @language.id, language: @params},
        format: :json
      @language.reload
    end

    it "find language by id" do
      expect(assigns :language).to eq @language
    end

    it {expect(@language.name).to eq "Update"}

    it "flash message" do
      JSON.parse(response.body)["message"]
        .should eq "Language was updated successfully!"
    end
  end

  describe 'DELETE #destroy' do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate(:user)
      @language = Fabricate :language

      sign_in @user
      allow(controller).to receive(:authorize_request).and_return(true)
    end

    it "find language by id" do
      delete :destroy, params: {id: @language.id}
      expect(assigns :language).to eq @language
    end

    it "deletes the language" do
      expect{
        delete :destroy, params: {id: @language.id}
      }.to change(Language,:count).by(-1)
    end

    it "redirect to languages_path when destroy" do
      delete :destroy, params: {id: @language.id}
      should redirect_to languages_path
    end

    it "flash message" do
      delete :destroy, params: {id: @language.id}, format: :json
      JSON.parse(response.body)["message"]
        .should eq "Language was deleted successfully!"
    end
  end
end
