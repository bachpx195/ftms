require "rails_helper"

RSpec.describe CourseSubject, type: :model  do
  describe "association" do
    it{is_expected.to belong_to :subject}
    it{is_expected.to belong_to :course}

    it{is_expected.to have_many :user_subjects}
    it{is_expected.to have_many :teams}
    it{is_expected.to have_many :dynamic_tasks}
    it{is_expected.to have_many :dynamic_assignments}
    it{is_expected.to have_many :dynamic_surveys}
    it{is_expected.to have_many :dynamic_projects}
    it{is_expected.to have_many :dynamic_test_rules}
    it{is_expected.to have_many :member_evaluations}
    it{is_expected.to have_many :static_tasks}
    it{is_expected.to have_many :static_assignments}
    it{is_expected.to have_many :static_surveys}
    it{is_expected.to have_many :static_projects}
    it{is_expected.to have_many :static_test_rules}
    it{is_expected.to have_many :tasks}
    it{is_expected.to have_many :projects}
  end

  describe "columns" do
    it{is_expected.to have_db_column(:subject_id).of_type(:integer)}
    it{is_expected.to have_db_column(:subject_name).of_type(:string)}
    it{is_expected.to have_db_column(:subject_description).of_type(:string)}
    it{is_expected.to have_db_column(:subject_content).of_type(:text)}
    it{is_expected.to have_db_column(:subject_image).of_type(:string)}
    it{is_expected.to have_db_column(:course_id).of_type(:integer)}
    it{is_expected.to have_db_column(:github_link).of_type(:string)}
    it{is_expected.to have_db_column(:heroku_link).of_type(:string)}
    it{is_expected.to have_db_column(:redmine_link).of_type(:string)}
    it{is_expected.to have_db_column(:deleted_at).of_type(:datetime)}
    it{is_expected.to have_db_column(:status).of_type(:integer)}
  end

  describe "creation" do
    subject{described_class.create}
    it "name of create association user_subjects" do
      subject.user_subjects.create
      subject.user_subjects.create
      subject.user_subjects.count.should_not eq(3)
    end

    it "name of create association teams" do
      subject.teams.create
      subject.teams.create
      subject.teams.count.should_not eq(3)
    end

    it "name of create association dynamic_tasks" do
      subject.dynamic_tasks.create user: User.create
      subject.dynamic_tasks.create user: User.create
      subject.dynamic_tasks.count.should_not eq(3)
    end

    it "name of create association member_evaluations" do
      subject.member_evaluations.create
      subject.member_evaluations.create
      subject.member_evaluations.count.should_not eq(3)
    end

    it "name of create association static_tasks" do
      subject.static_tasks.create
      subject.static_tasks.create
      subject.static_tasks.count.should eq(2)
    end

    it "name of create association static_assignments" do
      subject.static_assignments.create
      subject.static_assignments.create
      subject.static_assignments.count.should eq(2)
    end

    it "name of create association static_surveys" do
      subject.static_surveys.create
      subject.static_surveys.create
      subject.static_surveys.count.should eq(2)
    end

    it "name of create association static_projects" do
      subject.static_projects.create name: "abc"
      subject.static_projects.create name: "bcd"
      subject.static_projects.count.should eq(2)
    end

    it "name of create association static_test_rules" do
      subject.static_test_rules.create
      subject.static_test_rules.create
      subject.static_test_rules.count.should eq(2)
    end

    it "name of create association tasks" do
      subject.tasks.create
      subject.tasks.create
      subject.tasks.count.should eq(2)
    end

    it "name of create association projects" do
      subject.projects.create name: "abc"
      subject.projects.create name: "bcd"
      subject.projects.count.should eq(2)
    end
  end

  describe "can't creation" do
    subject{described_class.create}
    it "should return no dynamic_tasks" do
      subject.dynamic_tasks.create
      expect{raise ("User can't be blank")}.to raise_error(RuntimeError)
    end

    it "should return no static_projects" do
      subject.static_projects.create
      expect{raise ("Name can't be blank")}.to raise_error(RuntimeError)
    end

    it "should return no projects" do
      subject.projects.create
      expect{raise ("Name can't be blank")}.to raise_error(RuntimeError)
    end
  end

  describe "instance method" do
    subject{described_class.create}
    it "return unassigned_user_subjects" do
      user_subject_1 = subject.user_subjects.create
      user_subject_2 = subject.user_subjects.create
      subject.unassigned_user_subjects.should == [user_subject_1, user_subject_2]
    end
  end
end
