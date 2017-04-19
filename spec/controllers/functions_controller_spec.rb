require "rails_helper"

RSpec.describe FunctionsController, type: :controller do
  describe "callback" do
    it {should use_before_action(:authenticate_user!)}
    it {should_not use_before_action(:prevent_ssl)}
    it {should use_before_action(:find_function)}
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
      @function = Fabricate :function
      @functions = Function.select :id, :controller_name, :action, :parent_id,
      :humanize_name

      sign_in Fabricate(:user)
      allow(controller).to receive(:authorize_class).and_return(true)
    end

    it "assigns @functions" do
      get :index
      expect(assigns :functions).to eq @functions
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
        function: {
          humanize_name: "Test",
          controller_name: "roles",
          action: "roles",
          parent_id: nil
        }
      }

      sign_in Fabricate(:user)
      allow(controller).to receive(:authorize_class).and_return(true)
    end

    it "param pemit" do
      should permit(:humanize_name, :controller_name, :action, :parent_id).
        for(:create, params: {params: @params})
        .on(:function)
    end

    it "creates a new function" do
      expect{
        post :create, params: {function: @params}
      }.to change(Function,:count).by(1)
    end

    it "responds with JSON" do
      post :create, params: {function: @params}, format: :json
      response.header["Content-Type"].should include "application/json"
    end
  end

  describe "PUT #update" do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate(:user)
      @function = Fabricate(:function)

      @params = {
        humanize_name: "Updated",
        controller_name: "roles",
        action: "roles",
        parent_id: nil
      }

      sign_in @user
      allow(controller).to receive(:authorize_class).and_return(true)
      put :update, params: {id: @function.id, function: @params}
      @function.reload
    end

    it "find function by id" do
      expect(assigns :function).to eq @function
    end

    it {expect(@function.humanize_name).to eq "Updated"}
  end

  describe 'DELETE #destroy' do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate(:user)
      @function = Fabricate(:function)

      sign_in @user
      allow(controller).to receive(:authorize_class).and_return(true)
    end

    it "find function by id" do
      delete :destroy, params: {id: @function.id}
      expect(assigns :function).to eq @function
    end

    it "deletes the function" do
      expect{
        delete :destroy, params: {id: @function.id}
      }.to change(Function,:count).by(-1)
    end
  end
end
