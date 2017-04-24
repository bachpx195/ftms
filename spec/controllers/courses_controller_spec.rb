require "rails_helper"

RSpec.describe CoursesController, type: :controller do
  describe "callback" do
    it {should use_before_action(:authenticate_user!)}
    it {should_not use_before_action(:prevent_ssl)}
    it {should use_before_action(:find_program)}
    it {should use_before_action(:find_course)}
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
      @training_standard = Fabricate :training_standard
      @course = Course.create name: "course",
        training_standard_id: @training_standard.id,
        owner_id: @user.id
      @courses =  Course.includes :owner, :creator, :members,
        :managers, program: [:organization], training_standard: :subjects

      sign_in @user
      allow(controller).to receive(:authorize_request).and_return(true)
    end

    it "assigns @courses" do
      get :index
      expect(assigns :course_serializer)
        .to eq Serializers::Courses::CoursesSerializer
        .new(object: @courses).serializer
    end

    it "renders the :index template" do
      get :index
      expect(response).to render_template(:index)
    end
  end

  describe "POST #create" do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate :user
      @subject = Fabricate :subject
      @training_standard = Fabricate :training_standard,subject_ids: @subject.id
      @program = Fabricate :program
      @params = {
        name: "Course",
        training_standard_id: @training_standard.id,
        owner_id: @user.id,
        program_id: @program.id
      }

      request.env["HTTP_REFERER"] = "where_i_came_from"

      sign_in @user
      allow(controller).to receive(:authorize_request).and_return(true)
    end

    it "param pemit" do
      should permit(:name, :image, :description, :status, :start_date,
        :language_id, :program_id, :end_date, :training_standard_id,
        :owner_id, :documents)
        .for(:create, params: {params:{program_id: @program.id,
          course: @params}}).on(:course)
    end

    it "find program" do
      post :create, params: {program_id: @program.id, course: @params}
      expect(assigns :program).to eq @program
    end

    it "creates a new course" do
      expect{
        post :create, params: {program_id: @program.id, course: @params}
      }.to change(Course,:count).by(1)
    end

    it "redirects back to the referring page" do
      post :create, params: {program_id: @program.id, course: @params}
      response.should redirect_to "where_i_came_from"
    end

    it "responds with JSON" do
      post :create, params: {program_id: @program.id, course: @params},
        format: :json
      response.header["Content-Type"].should include "application/json"
    end

    it "flash message" do
      post :create, params: {program_id: @program.id, course: @params},
        format: :json
      JSON.parse(response.body)["message"]
        .should eq "Course was created successfully!"
    end
  end

  describe "GET #show" do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate :user
      @subject = Fabricate :subject
      @training_standard = Fabricate :training_standard,subject_ids: @subject.id
      @program = Fabricate :program
      @course = @program.courses.create name: "Course",
        training_standard_id: @training_standard.id,
        owner_id: @user.id,
        program_id: @program.id

      sign_in @user
      allow(controller).to receive(:authorize_request).and_return(true)
      get :show, params: {id: @course.id}
    end

    it "find course" do
      expect(assigns :course).to eq @course
    end

    it "assigns view object @course_supports" do
      expect((assigns :course_supports).program).to eq @program
    end

    it "renders the :show template" do
      expect(response).to render_template(:show)
    end
  end

  describe "PUT #update" do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate :user
      @subject = Fabricate :subject
      @training_standard = Fabricate :training_standard,subject_ids: @subject.id
      @program = Fabricate :program
      @course = @program.courses.create name: "Course",
        training_standard_id: @training_standard.id,
        owner_id: @user.id,
        program_id: @program.id

      @params = {
        name: "Updated"
      }

      sign_in @user
      allow(controller).to receive(:authorize_request).and_return(true)
      put :update, params: {id: @course.id, course: @params}, format: :json
      @course.reload
    end

    it "find course" do
      expect(assigns :course).to eq @course
    end

    it {expect(@course.name).to eq "Updated"}

    it "flash message" do
      JSON.parse(response.body)["message"]
        .should eq "Course was updated successfully!"
    end
  end

  describe 'DELETE #destroy' do
    before :each do
      DatabaseCleaner.start
      @user = Fabricate :user
      @subject = Fabricate :subject
      @training_standard = Fabricate :training_standard,subject_ids: @subject.id
      @program = Fabricate :program
      @course = @program.courses.create name: "Course",
        training_standard_id: @training_standard.id,
        owner_id: @user.id,
        program_id: @program.id

      sign_in @user
      allow(controller).to receive(:authorize_request).and_return(true)
    end

    it "find course by id" do
      delete :destroy, params: {id: @course.id}
      expect(assigns :course).to eq @course
    end

    it "deletes the course" do
      expect{
        delete :destroy, params: {id: @course.id}
      }.to change(Course,:count).by(-1)
    end

    it "flash message" do
      delete :destroy, params: {id: @course.id}, format: :json
      JSON.parse(response.body)["message"]
        .should eq "Course was deleted successfully!"
    end
  end
end
