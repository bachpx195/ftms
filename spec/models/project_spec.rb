require "rails_helper"

RSpec.describe Project, type: :model do
  describe "association" do
    it{is_expected.to have_many :requirements}
    it{is_expected.to have_many :static_tasks}
    it{is_expected.to have_many(:course_subjects).through :tasks}
    it{is_expected.to have_many(:dynamic_tasks).through :static_tasks}
    it{is_expected.to have_many :tasks}

    it{is_expected.to belong_to :organization}
    it{is_expected.to belong_to :creator}
  end

  describe "columns" do
    it{is_expected.to have_db_column(:name).of_type(:string)}
    it{is_expected.to have_db_column(:description).of_type(:string)}
    it{is_expected.to have_db_column(:organization_id).of_type(:integer)
      .with_options index: true}
    it{is_expected.to have_db_column(:subject_id).of_type(:integer)
      .with_options index: true}
    it{is_expected.to have_db_column(:task_id).of_type(:integer)
      .with_options index: true}
    it{is_expected.to have_db_column(:creator_id).of_type(:integer)
      .with_options index: true}
    it{is_expected.to have_db_column(:deleted_at).of_type :datetime}
  end

  describe "creation" do
    subject{described_class.create name: "project"}
    let(:user){User.create email: "qwe@gmail.com", password: "123456"}

    it "number of create association requirements" do
      subject.requirements.create name: "requirements_1"
      subject.requirements.create name: "requirements_2"
      subject.requirements.count.should eq(2)
    end

    it "number of create association static tasks" do
      subject.static_tasks.create
      subject.static_tasks.create
      subject.static_tasks.count.should eq(2)
    end

    it "number of create association Tasks" do
      subject.tasks.create user_id: user.id
      subject.tasks.create user_id: user.id
      subject.tasks.count.should eq(2)
    end
  end

  describe "validation" do
    it "is valid with a name" do
      project = Project.new name: "project"
      expect(project).to be_valid
    end

    it "is invalid without a name" do
      project = Project.new
      project.valid?
      expect(project.errors[:name]).to include("can't be blank")
    end
  end

  describe "constant" do
    it "should have a fixed list constant" do
      expect(described_class).to have_constant :ATTRIBUTE_PARAMS
    end
  end
end
