require "rails_helper"

RSpec.describe UserSubject, type: :model do
  describe "association" do
    it{is_expected.to have_many(:tasks).class_name("DynamicTask")
      .dependent :destroy}
    it{is_expected.to have_many(:static_tasks).through(:tasks)
      .source :targetable}
    it{is_expected.to have_many(:dynamic_surveys).through(:static_tasks)
      .source :targetable}
    it{is_expected.to have_many(:dynamic_assignments).through(:static_tasks)
      .source :targetable}
    it{is_expected.to have_many(:dynamic_projects).through(:static_tasks)
      .source :targetable}
    it{is_expected.to have_many(:dynamic_test_rules).through(:static_tasks)
      .source :targetable}

    it{is_expected.to belong_to :user}
    it{is_expected.to belong_to :user_course}
    it{is_expected.to belong_to :course_subject}
    it{is_expected.to belong_to :subject}
    it{is_expected.to belong_to :team}
  end

  describe "columns" do
    it{is_expected.to have_db_column(:user_id).of_type :integer}
    it{is_expected.to have_db_column(:status).of_type(:integer)
      .with_options(default: :init, null: false)}
    it{is_expected.to have_db_column(:user_course_id).of_type :integer}
    it{is_expected.to have_db_column(:course_subject_id).of_type :integer}
    it{is_expected.to have_db_column(:current_progress).of_type :boolean}
    it{is_expected.to have_db_column(:user_end_date).of_type :date}
    it{is_expected.to have_db_column(:start_date).of_type :date}
    it{is_expected.to have_db_column(:end_date).of_type :date}
    it{is_expected.to have_db_column(:subject_id).of_type :integer}
    it{is_expected.to have_db_column(:team_id).of_type :integer}
    it{is_expected.to have_db_column(:deleted_at).of_type :datetime}
  end

  describe "creation" do
    subject{described_class.create}
    let(:user){User.create email: "sdf@gmail.com", password: "123456"}

    it "number of create association Tasks" do
      subject.tasks.create user_id: user.id
      subject.tasks.create user_id: user.id
      subject.tasks.count.should eq(2)
    end
  end
end
