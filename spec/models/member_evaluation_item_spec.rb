require "rails_helper"

RSpec.describe MemberEvaluationItem, type: :model do
  describe "association" do
    it{is_expected.to belong_to :member_evaluation}
    it{is_expected.to belong_to :evaluation_standard}
  end

  describe "columns" do
    it{is_expected.to have_db_column(:evaluation_point).of_type :integer}
    it{is_expected.to have_db_column(:member_evaluation_id).of_type :integer}
    it{is_expected.to have_db_column(:evaluation_standard_id).of_type :integer}
    it{is_expected.to have_db_column(:deleted_at).of_type :datetime}
  end
end
