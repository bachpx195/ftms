require "rails_helper"

RSpec.describe RoleFunction, type: :model do
  describe "association" do
    it{is_expected.to belong_to :role}
    it{is_expected.to belong_to :function}
  end

  describe "columns" do
    it{is_expected.to have_db_column(:role_id).of_type(:integer)}
    it{is_expected.to have_db_column(:function_id).of_type(:integer)}
  end
end
