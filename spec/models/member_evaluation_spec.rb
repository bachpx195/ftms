require "rails_helper"

RSpec.describe MemberEvaluation, type: :model do
  describe "validation" do
    context "association" do
      it{is_expected.to have_many :member_evaluation_items}

      it{is_expected.to belong_to :targetable}
      it{is_expected.to belong_to :manager}
      it{is_expected.to belong_to :member}
      it{is_expected.to belong_to :evaluation_template}
    end

    context "columns" do
      it{is_expected.to have_db_column(:manager_id).of_type(:integer)}
      it{is_expected.to have_db_column(:member_id).of_type(:integer)}
      it{is_expected.to have_db_column(:total_point).of_type(:float)}
      it{is_expected.to have_db_column(:targetable_id).of_type(:integer)}
      it{is_expected.to have_db_column(:targetable_type).of_type(:string)}
      it{is_expected.to have_db_column(:evaluation_template_id)
        .of_type(:integer)}
      it{is_expected.to have_db_column(:deleted_at).of_type(:datetime)}
    end
  end

  describe "constant" do
    it "should have a fixed list constant" do
      expect(described_class).to have_constant :ATTRIBUTE_PARAMS
    end
  end
end
