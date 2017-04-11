require "rails_helper"

RSpec.describe UserCourse, type: :model do
  describe "association" do
    it{is_expected.to have_many :user_subjects}

    it{is_expected.to belong_to :user}
    it{is_expected.to belong_to :course}
  end

  describe "columns" do
    it{is_expected.to have_db_column(:type).of_type :string}
    it{is_expected.to have_db_column(:user_id).of_type :integer}
    it{is_expected.to have_db_column(:course_id).of_type :integer}
    it{is_expected.to have_db_column(:status).of_type(:integer)
      .with_options(default: :init, null: false)}
    it{is_expected.to have_db_column(:deleted_at).of_type :datetime}
  end

  describe "creation" do
    subject{described_class.create}

    it "number of create association user subjects" do
      subject.user_subjects.create
      subject.user_subjects.create
      subject.user_subjects.count.should eq(2)
    end
  end
end
