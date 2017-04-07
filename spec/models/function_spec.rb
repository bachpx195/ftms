require "rails_helper"

RSpec.describe Function, type: :model do
  describe "association" do
    it{is_expected.to have_many :role_functions}
    it{is_expected.to have_many(:roles).through :role_functions}
    it{is_expected.to have_many :user_functions}
    it{is_expected.to have_many(:users).through :user_functions}
  end

  describe "columns" do
    it{is_expected.to have_db_column(:humanize_name).of_type(:string)}
    it{is_expected.to have_db_column(:controller_name).of_type(:string)}
    it{is_expected.to have_db_column(:action).of_type(:string)}
    it{is_expected.to have_db_column(:parent_id).of_type(:integer)}
    it{is_expected.to have_db_column(:row_order).of_type(:integer)}
  end

  describe "creation" do
    subject{described_class.create}

    it "number of create association role functions" do
      subject.role_functions.create
      subject.role_functions.create
      subject.role_functions.count.should eq(2)
    end

    it "number of create association roles" do
      subject.roles.create name: "role 1"
      subject.roles.create name: "role 2"
      subject.roles.count.should eq(2)
    end

    it "number of create association user functions" do
      subject.user_functions.create
      subject.user_functions.create
      subject.user_functions.count.should eq(2)
    end
  end

  describe "scope" do
    it "Arrange functions in ascending order" do
      Function.destroy_all
      parent_function = Function.create parent_id: nil
      function = Function.create parent_id: 1
      Function.order_by_parent_id.should == [parent_function, function]
    end
  end
end
