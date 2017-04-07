require "rails_helper"

RSpec.describe StandardOrganization, type: :model do
  describe "association" do
    it{is_expected.to belong_to :organization}
    it{is_expected.to belong_to :training_standard}
  end

  describe "columns" do
    it{is_expected.to have_db_column(:organization_id).of_type(:integer)}
    it{is_expected.to have_db_column(:training_standard_id).of_type(:integer)}
  end
end
