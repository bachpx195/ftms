require "rails_helper"

RSpec.describe Role, type: :model do
  describe "association" do
    it{is_expected.to have_many :user_roles}
    it{is_expected.to have_many(:users).through :user_roles}
    it{is_expected.to have_many :role_functions}
    it{is_expected.to have_many(:functions).through :role_functions}
  end

  describe "columns" do
    it{is_expected.to have_db_column(:name).of_type(:string)}
    it{is_expected.to have_db_column(:parent_id).of_type(:integer)}
  end

  describe "creation" do
    subject{described_class.create name: "role"}

    it "number of create association User Roles" do
      subject.user_roles.create
      subject.user_roles.create
      subject.user_roles.count.should eq(2)
    end

    it "number of create association Users" do
      subject.users.create email: "sth1@gmail.com", password: "123456"
      subject.users.create email: "sth2@gmail.com", password: "123456"
      subject.users.count.should eq(2)
    end

    it "number of create association role functions" do
      subject.role_functions.create
      subject.role_functions.create
      subject.role_functions.count.should eq(2)
    end

    it "number of create association function" do
      subject.functions.create
      subject.functions.create
      subject.functions.count.should eq(2)
    end
  end

  describe "validation" do
    it "is valid with a name" do
      role = Role.new name: "role"
      expect(role).to be_valid
    end

    it "is invalid without a name" do
      role = Role.new
      role.valid?
      expect(role.errors[:name]).to include("can't be blank")
    end
  end

  describe "scope" do
    it "Arrange role in ascending order" do
      Role.destroy_all
      parent_role = Role.create name: "parent_role", parent_id: nil
      role = Role.create name: "role", parent_id: 1
      Role.order_by_parent_id.should == [parent_role, role]
    end
  end

  describe "constant" do
    it "should have a fixed list constant" do
      expect(described_class).to have_constant :ATTRIBUTE_PARAMS
    end
  end

  describe "nested attribute" do
    it{should accept_nested_attributes_for(:role_functions)
      .allow_destroy(true)}

    context "reject if function is blank" do
      function = Function.create

      it{expect{Role.create(name: "role",
        role_functions_attributes: [function_id: function.id])}
        .to change(RoleFunction, :count).by(1)}

      it{expect{Role.create(name: "role",
        role_functions_attributes: [function_id: ""])}
        .to_not change(RoleFunction, :count)}
    end
  end
end
