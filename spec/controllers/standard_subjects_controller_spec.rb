require "rails_helper"

RSpec.describe StandardSubjectsController, type: :controller do
  describe "callback" do
    it {should use_before_action(:authenticate_user!)}
    it {should_not use_before_action(:prevent_ssl)}
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
      @subject = Fabricate :subject
      @training_standard = Fabricate :training_standard
      @standard_subjects = StandardSubject
        .create subject: @subject, training_standard: @training_standard

      sign_in Fabricate(:user)
      allow(controller).to receive(:authorize_class).and_return(true)
    end

    it "assigns @standard_subjects" do
      get :index, format: :json
      expect(assigns :standard_subjects).to eq StandardSubject
        .select :id, :training_standard_id, :subject_id
    end

    it "render JSON" do
      get :index, format: :json
      response.header["Content-Type"].should include "application/json"
    end
  end

  describe "POST #create" do
    before :each do
      DatabaseCleaner.start
      @subject = Fabricate :subject
      @training_standard = Fabricate :training_standard
      @params = {
        subject_id: @subject.id,
        training_standard_id: @training_standard.id
      }

      sign_in Fabricate(:user)
      allow(controller).to receive(:authorize_class).and_return(true)
    end

    it "params permit" do
      should permit(:training_standard_id, :subject_id).
        for(:create, params: {params: {standard_subject: @params}})
        .on(:standard_subject)
    end

    it "creates a new standard_subject" do
      expect{
        post :create, params: {standard_subject: @params}
      }.to change(StandardSubject, :count).by(1)
    end

    it "responds with JSON" do
      post :create, params: {standard_subject: @params}, format: :json
      response.header["Content-Type"].should include "application/json"
    end

    it "redirect to root when created" do
      post :create, params: {standard_subject: @params}
      should redirect_to root_path
    end

    it "flash message" do
      post :create, params: {standard_subject: @params}, format: :json
      JSON.parse(response.body)["message"]
        .should eq "StandardSubject was created successfully!"
    end
  end

  describe 'DELETE #destroy' do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate(:user)
      @subject = Fabricate :subject
      @training_standard = Fabricate :training_standard
      @standard_subject = StandardSubject
        .create subject: @subject, training_standard: @training_standard

      sign_in @user
      allow(controller).to receive(:authorize_class).and_return(true)
    end

    it "find standard_subject by id" do

      delete :destroy, params: {id: @standard_subject.id}
      expect(assigns :standard_subject).to eq @standard_subject
    end

    it "deletes the standard_subject" do
      expect{
        delete :destroy, params: {id: @standard_subject.id}
      }.to change(StandardSubject,:count).by(-1)
    end

    it "redirect to root when destroy" do
      delete :destroy, params: {id: @standard_subject.id}
      should redirect_to root_path
    end

    it "flash message" do
      delete :destroy, params: {id: @standard_subject.id}, format: :json
      JSON.parse(response.body)["message"]
        .should eq "StandardSubject was deleted successfully!"
    end
  end
end
