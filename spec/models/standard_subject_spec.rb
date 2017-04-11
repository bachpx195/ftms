require "rails_helper"

RSpec.describe StandardSubject, type: :model do
  describe "association" do
    it{is_expected.to belong_to :subject}
    it{is_expected.to belong_to :training_standard}
  end

  describe "columns" do
    it{is_expected.to have_db_column(:subject_id).of_type(:integer)}
    it{is_expected.to have_db_column(:training_standard_id).of_type(:integer)}
  end

  describe "validation" do
    let(:training_standard){TrainingStandard.create name: "training_standard"}
    let(:subject){Subject.create name: "sub", during_time: "1"}

    it "is valid with a training_standard, subject" do
      standard_subject = StandardSubject
        .new training_standard_id: training_standard.id,
        subject_id: subject.id
      expect(standard_subject).to be_valid
    end

    it "is invalid without a training_standard" do
      standard_subject = StandardSubject.new subject_id: subject.id
      standard_subject.valid?
      expect(standard_subject.errors[:training_standard])
        .to include("can't be blank")
    end

    it "is invalid without a subject" do
      standard_subject = StandardSubject
        .new training_standard_id: training_standard.id
      standard_subject.valid?
      expect(standard_subject.errors[:subject]).to include("can't be blank")
    end
  end
end
