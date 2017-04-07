require "rails_helper"

RSpec.describe UserRole, type: :model do
  describe "association" do
    it{is_expected.to belong_to :role}
    it{is_expected.to belong_to :user}
  end

  describe "columns" do
    it{is_expected.to have_db_column(:role_id).of_type(:integer)}
    it{is_expected.to have_db_column(:user_id).of_type(:integer)}
  end

  describe "scope" do
    it "Get ids of role by user" do
      UserRole.destroy_all
      user_1 = User.create email: "asd@gmail.com", password: "123456"
      user_2 = User.create email: "bnm@gmail.com", password: "123456"
      role_1 = Role.create name: "role_1"
      role_2 = Role.create name: "role_2"
      user_1.user_roles.create role_id: role_1.id
      user_1.user_roles.create role_id: role_2.id
      user_2.user_roles.create role_id: role_1.id
      UserRole.role_by_user([user_1.id, user_2.id])
        .should == [role_1.id, role_2.id]
    end
  end
end
