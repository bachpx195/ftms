require "rails_helper"

RSpec.describe TeamsController, type: :controller do
  describe "callback" do
    it {should use_before_action(:authenticate_user!)}
    it {should_not use_before_action(:prevent_ssl)}
    it {should use_before_action(:load_supports)}
    it {should use_before_action(:find_team)}
  end

  describe "POST #create" do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate :user
      @subject = Fabricate :subject
      @params = {
        name: "My Team",
      }

      sign_in @user
    end

    it "param pemit" do
      should permit(:name, :course_subject_id)
        .for(:create, params: {params: {team: @params}, format: :json}).on :team
    end

    it "creates a new team" do
      expect{
        post :create, params: { team: @params},format: :json
      }.to change(Team,:count).by(1)
    end

    it "responds with JSON" do
      post :create, params: {team: @params}, format: :json
      response.header["Content-Type"].should include "application/json"
    end
  end

  describe "GET #show" do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate :user
      @team = Fabricate :team

      sign_in @user
      get :show, params: {id: @team.id}
    end

    it "assigns view object @team_supports" do
      expect((assigns :team_supports).team).to eq @team
    end

    it "renders the :show template" do
      expect(response).to render_template(:show)
    end
  end
end
