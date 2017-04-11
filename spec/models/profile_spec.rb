require "rails_helper"

RSpec.describe Profile, type: :model do
  describe "association" do
    it{is_expected.to belong_to :user}
    it{is_expected.to belong_to(:trainee).class_name "User"}
    it{is_expected.to belong_to :university}
    it{is_expected.to belong_to :trainee_type}
    it{is_expected.to belong_to :user_status}
    it{is_expected.to belong_to :stage}
    it{is_expected.to belong_to :organization}
    it{is_expected.to belong_to :program}
  end

  describe "columns" do
    it{is_expected.to have_db_column(:user_id).of_type :integer}
    it{is_expected.to have_db_column(:start_training_date).of_type :date}
    it{is_expected.to have_db_column(:leave_date).of_type :date}
    it{is_expected.to have_db_column(:finish_training_date).of_type :date}
    it{is_expected.to have_db_column(:ready_for_project).of_type :boolean}
    it{is_expected.to have_db_column(:contract_date).of_type :date}
    it{is_expected.to have_db_column(:naitei_company).of_type :string}
    it{is_expected.to have_db_column(:university_id).of_type :integer}
    it{is_expected.to have_db_column(:graduation).of_type :date}
    it{is_expected.to have_db_column(:language_id).of_type :integer}
    it{is_expected.to have_db_column(:trainee_type_id).of_type :integer}
    it{is_expected.to have_db_column(:user_status_id).of_type :integer}
    it{is_expected.to have_db_column(:stage_id).of_type :integer}
    it{is_expected.to have_db_column(:organization_id).of_type :integer}
    it{is_expected.to have_db_column(:working_day).of_type :float}
    it{is_expected.to have_db_column(:program_id).of_type :integer}
    it{is_expected.to have_db_column(:staff_code).of_type :string}
    it{is_expected.to have_db_column(:division).of_type :integer}
    it{is_expected.to have_db_column(:join_div_date).of_type :date}
    it{is_expected.to have_db_column(:deleted_at).of_type :datetime}
  end

  describe "nested attribute" do
    it{should accept_nested_attributes_for(:user)}
  end

  describe "constant" do
    it "should have a fixed list constant" do
      expect(described_class).to have_constant :ATTRIBUTE_PARAMS
      expect(described_class).to have_constant :CHANGE_PROFILE_PARAMS
    end
  end
end
