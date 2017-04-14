require "rails_helper"

RSpec.describe CourseManager, type: :model do
  describe "association" do
    it{is_expected.to belong_to :user}
    it{is_expected.to have_many(:user_subjects).with_foreign_key(:user_course_id)
      .dependent(:destroy)}
  end

  describe "columns" do
    it{is_expected.to have_db_column(:type).of_type(:string)}
    it{is_expected.to have_db_column(:user_id).of_type(:integer)}
    it{is_expected.to have_db_column(:course_id).of_type(:integer)}
    it{is_expected.to have_db_column(:status).of_type(:integer)
      .with_options(default: :init, null: false)}
    it{is_expected.to have_db_column(:deleted_at).of_type(:datetime)}
  end

  describe "format validations" do
    it{is_expected.to allow_value("CourseSubject").for(:type)}
    it{is_expected.to allow_value(1).for(:user_id)}
    it{is_expected.to allow_value(2).for(:course_id)}
    it{is_expected.to allow_value(1).for(:status)}
    it{is_expected.to allow_value("20/03/1995").for(:deleted_at)}
  end

  describe "creation" do
    subject{described_class.create}
    it "has none to begin with" do
      CourseManager.destroy_all
      expect(CourseManager.count).to eq(0)
    end

    it "has one after adding one" do
      CourseManager.destroy_all
      CourseManager.create
      expect(CourseManager.count).to eq(1)
    end

    it "number of create association user_subjects" do
      subject.user_subjects.create
      subject.user_subjects.create
      subject.user_subjects.count.should eq(2)
    end
  end
end
