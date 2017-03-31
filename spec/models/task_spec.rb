require "rails_helper"

RSpec.describe Task, type: :model do
  describe "validation" do
    context "association" do
      it{is_expected.to belong_to :targetable}
      it{is_expected.to belong_to :ownerable}
    end

    context "columns" do
      it{is_expected.to have_db_column(:targetable_id).of_type(:integer)}
      it{is_expected.to have_db_column(:targetable_type).of_type(:string)}
      it{is_expected.to have_db_column(:ownerable_id).of_type(:integer)}
      it{is_expected.to have_db_column(:ownerable_type).of_type(:string)}
      it{is_expected.to have_db_column(:user_id).of_type(:integer)}
      it{is_expected.to have_db_column(:status).of_type(:integer)}
      it{is_expected.to have_db_column(:type).of_type(:string)}
      it{is_expected.to have_db_column(:deleted_at).of_type(:datetime)}
    end
  end
end
