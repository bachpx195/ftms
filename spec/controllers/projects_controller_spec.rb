require "rails_helper"

RSpec.describe ProjectsController, type: :controller do
  describe "callback" do
    it {should use_before_action(:authenticate_user!)}
    it {should_not use_before_action(:prevent_ssl)}
    it {should use_before_action(:find_project)}
    it {should use_before_action(:load_organizations)}
    it {should use_before_action(:load_supports)}
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
      @project = Fabricate :project
      @organization = Fabricate :organization

      sign_in Fabricate(:user)
      allow(controller).to receive(:authorize_request).and_return(true)
      get :index
    end

    it "assigns @organizations" do
      expect(assigns :organizations).to eq Organization.all
    end

    it "renders the :index template" do
      expect(response).to render_template(:index)
    end
  end

  describe "POST #create" do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate(:user)
      @params = {
        name: "Test",
        creator_id: @user.id
      }

      sign_in @user
      allow(controller).to receive(:authorize_request).and_return(true)
    end

    it "params permit" do
      should permit(:name, :description, :organization_id)
        .for(:create, params: {params: {project: @params}})
        .on(:project)
    end

    it "creates a new project" do
      expect{
        post :create, params: {project: @params}, format: :json
      }.to change(Project,:count).by(1)
    end

    it "responds with JSON" do
      post :create, params: {project: @params}, format: :json
      response.header["Content-Type"].should include "application/json"
    end

    it "flash message" do
      post :create, params: {project: @params}, format: :json
      JSON.parse(response.body)["message"]
        .should eq "Project was created successfully!"
    end
  end

  describe "GET #show" do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate(:user)
      @project = Fabricate :project
      @training_standard = Fabricate :training_standard
      @course = Course.create name: "Test",
        training_standard_id: @training_standard.id,
        owner_id: @user.id
      @subject = Fabricate :subject
      @course.course_subjects.create subject_id: @subject.id
      sign_in @user
      allow(controller).to receive(:authorize_request).and_return(true)
      get :show, params: {id: @project.id, subject_id: @subject.id},
        format: :json
    end

    it "find project by id" do
      expect(assigns :project).to eq @project
    end

    it "responds with JSON" do
      response.header["Content-Type"].should include "application/json"
    end
  end

  describe "PUT #update" do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate(:user)
      @project = Fabricate :project

      @params = {
        name: "Update"
      }

      sign_in @user
      allow(controller).to receive(:authorize_request).and_return(true)
      put :update, params: {id: @project.id, project: @params}, format: :json
      @project.reload
    end

    it "find project by id" do
      expect(assigns :project).to eq @project
    end

    it {expect(@project.name).to eq "Update"}

    it "flash message" do
      JSON.parse(response.body)["message"]
        .should eq "Project was updated successfully!"
    end
  end

  describe 'DELETE #destroy' do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate(:user)
      @project = Fabricate :project

      sign_in @user
      allow(controller).to receive(:authorize_request).and_return(true)
    end

    it "find project by id" do
      delete :destroy, params: {id: @project.id}
      expect(assigns :project).to eq @project
    end

    it "deletes the project" do
      expect{
        delete :destroy, params: {id: @project.id}
      }.to change(Project,:count).by(-1)
    end

    it "flash message" do
      delete :destroy, params: {id: @project.id}, format: :json
      JSON.parse(response.body)["message"]
        .should eq "Project was deleted successfully!"
    end
  end
end
