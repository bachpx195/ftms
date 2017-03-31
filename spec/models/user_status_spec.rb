require "rails_helper"

RSpec.describe UserStatus, type: :model do
  describe "validation" do
    context "association" do
      it{is_expected.to have_many :profiles}
    end

    context "columns" do
      it{is_expected.to have_db_column(:name).of_type(:string)}
      it{is_expected.to have_db_column(:deleted_at).of_type(:datetime)}
    end
  end
end
