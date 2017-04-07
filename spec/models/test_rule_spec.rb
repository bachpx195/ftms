require "rails_helper"

RSpec.describe TestRule, type: :model do
  describe "association" do
    it{is_expected.to have_many :rule_questions}
    it{is_expected.to have_many :rule_categories}
    it{is_expected.to have_many :exams}
    it{is_expected.to have_many :tasks}
    it{is_expected.to have_many(:subjects).through :tasks}
    it{is_expected.to have_many(:courses).through :tasks}
    it{is_expected.to have_many(:dynamic_tasks).through :static_tasks}

    it{is_expected.to belong_to :organization}
    it{is_expected.to belong_to(:creator).class_name "User"}
  end

  describe "columns" do
    it{is_expected.to have_db_column(:name).of_type :string}
    it{is_expected.to have_db_column(:total_question).of_type :integer}
    it{is_expected.to have_db_column(:time_of_test).of_type :integer}
    it{is_expected.to have_db_column(:min_score_for_pass).of_type :integer}
    it{is_expected.to have_db_column(:ready_for_project).of_type :boolean}
    it{is_expected.to have_db_column(:opportunity).of_type :integer}
    it{is_expected.to have_db_column(:number_of_test).of_type :integer}
    it{is_expected.to have_db_column(:creator_id).of_type(:integer)
      .with_options index: true}
    it{is_expected.to have_db_column(:organization_id).of_type(:integer)
      .with_options index: true}
  end

  describe "creation" do
    subject{described_class.create}
    let(:user){User.create email: "rty@gmail.com", password: "123456"}

    it "number of create association rule questions" do
      subject.rule_questions.create
      subject.rule_questions.create
      subject.rule_questions.count.should eq(2)
    end

    it "number of create association rule categories" do
      subject.rule_categories.create
      subject.rule_categories.create
      subject.rule_questions.count.should eq(2)
    end

    it "number of create association exams" do
      subject.exams.create
      subject.exams.create
      subject.exams.count.should eq(2)
    end

    it "number of create association Tasks" do
      subject.tasks.create user_id: user.id
      subject.tasks.create user_id: user.id
      subject.tasks.count.should eq(2)
    end

    it "number of create association Subject" do
      subject.subjects.create name: "sub1", during_time: "1"
      subject.subjects.create name: "sub2", during_time: "2"
      subject.subjects.count.should eq(2)
    end

    it "number of create association Courses" do
      subject.courses.create name: "course1",
        training_standard_id: training_standard.id,
        owner_id: owner.id
      subject.courses.create name: "course2",
        training_standard_id: training_standard.id,
        owner_id: owner.id
      subject.courses.count.should eq(2)
    end
  end
end
