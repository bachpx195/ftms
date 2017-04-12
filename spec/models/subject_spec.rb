require "rails_helper"

RSpec.describe Subject, type: :model do
  describe "association" do
    it{is_expected.to have_many(:standard_subjects).dependent :destroy}
    it{is_expected.to have_many(:training_standards).through :standard_subjects}
    it{is_expected.to have_many(:course_subjects).dependent :destroy}
    it{is_expected.to have_many(:user_subjects).dependent :destroy}
    it{is_expected.to have_many(:static_tasks).class_name("StaticTask")
      .dependent :destroy}
    it{is_expected.to have_many(:assignments).through(:static_tasks)
      .source :targetable}
    it{is_expected.to have_many(:surveys).through(:static_tasks)
      .source :targetable}
    it{is_expected.to have_many(:test_rules).through(:static_tasks)
      .source :targetable}
    it{is_expected.to have_many(:documents).dependent :destroy}

    it{is_expected.to belong_to :organization}
    it{is_expected.to belong_to(:creator).class_name "User"}
  end

  describe "columns" do
    it{is_expected.to have_db_column(:name).of_type :string}
    it{is_expected.to have_db_column(:image).of_type :string}
    it{is_expected.to have_db_column(:content).of_type :text}
    it{is_expected.to have_db_column(:deleted_at).of_type :datetime}
    it{is_expected.to have_db_column(:during_time).of_type :integer}
    it{is_expected.to have_db_column(:organization_id).of_type(:integer)
      .with_options index: true}
    it{is_expected.to have_db_column(:organization_id).of_type(:integer)
      .with_options index: true}
    it{is_expected.to have_db_column(:creator_id).of_type :integer}
  end

  describe "creation" do
    subject{described_class.create name: "sub", during_time: "1"}
    let(:training_standard){TrainingStandard.create name: "training_standard"}
    let(:subject){Subject.create name: "sub", during_time: "1"}

    it "number of create association standard subjects" do
      subject.standard_subjects
        .create training_standard_id: training_standard.id,
        subject_id: subject.id
      subject.standard_subjects
        .create training_standard_id: training_standard.id,
        subject_id: subject.id
      subject.standard_subjects.count.should eq(2)
    end

    it "number of create association training standards" do
      subject.training_standards.create name: "training_standards_1"
      subject.training_standards.create name: "training_standards_2"
      subject.training_standards.count.should eq(2)
    end

    it "number of create association course subjects" do
      subject.course_subjects.create
      subject.course_subjects.create
      subject.course_subjects.count.should eq(2)
    end

    it "number of create association user subjects" do
      subject.user_subjects.create
      subject.user_subjects.create
      subject.user_subjects.count.should eq(2)
    end

    it "number of create association static tasks" do
      subject.static_tasks.create
      subject.static_tasks.create
      subject.static_tasks.count.should eq(2)
    end

    it "number of create association assignments" do
      subject.assignments.create
      subject.assignments.create
      subject.assignments.count.should eq(2)
    end

    it "number of create association surveys" do
      subject.surveys.create
      subject.surveys.create
      subject.surveys.count.should eq(2)
    end

    it "number of create association test rules" do
      subject.test_rules.create
      subject.test_rules.create
      subject.test_rules.count.should eq(2)
    end

    it "number of create association documents" do
      subject.documents.create
      subject.documents.create
      subject.documents.count.should eq(2)
    end
  end

  describe "validation" do
    it "is valid with a name, during_time" do
      subject = Subject.new name: "sub", during_time: "1"
      expect(subject).to be_valid
    end

    it "is invalid without a name" do
      subject = Subject.new during_time: "1"
      subject.valid?
      expect(subject.errors[:name]).to include("can't be blank")
    end

    it{should validate_numericality_of(:during_time).only_integer
      .is_greater_than_or_equal_to 0}
  end

  describe "Upload image" do
    it{expect{Subject.create name: "sub", during_time: "1",
      image: File.open(File.join(Rails.root, "/spec/fixtures/files/test.png"))}
      .to change(Subject, :count).by 1}
  end

  describe "scope" do
    it "find remain subjects" do
      Subject.destroy_all
      subject_1 = Subject.create name: "sub_1", during_time: "1"
      subject_2 = Subject.create name: "sub_2", during_time: "1"
      subject_remain = Subject.create name: "subject_remain", during_time: "1"
      Subject.find_remain_subjects([subject_1.id, subject_2.id])
        .should == [subject_remain]
    end
  end

  describe "instance method" do
    it "return subjects of user" do
    end
  end

  describe "constant" do
    it "should have a fixed list constant" do
      expect(described_class).to have_constant :ATTRIBUTE_PARAMS
    end
  end
end
