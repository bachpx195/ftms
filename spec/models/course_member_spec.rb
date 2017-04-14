require "rails_helper"

RSpec.describe CourseMember, type: :model do
  describe "columns" do
    it{is_expected.to have_db_column(:type).of_type(:string)}
    it{is_expected.to have_db_column(:user_id).of_type(:integer)}
    it{is_expected.to have_db_column(:course_id).of_type(:integer)}
    it{is_expected.to have_db_column(:status).of_type(:integer)
      .with_options(default: :init, null: false)}
  end

  describe "format validations" do
    it{is_expected.to allow_value("CourseSubject").for(:type)}
    it{is_expected.to allow_value(1).for(:user_id)}
    it{is_expected.to allow_value(1).for(:course_id)}
    it{is_expected.to allow_value(1).for(:status)}
  end

  describe "creation" do
    it "has none to begin with" do
      CourseMember.destroy_all
      expect(CourseMember.count).to eq(0)
    end

    it "has one after adding one" do
      CourseMember.destroy_all
      CourseMember.create
      expect(CourseMember.count).to_not eq(2)
    end
  end
end
