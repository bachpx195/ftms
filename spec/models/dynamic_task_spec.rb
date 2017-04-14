require "rails_helper"

RSpec.describe DynamicTask, type: :model do
  describe "association" do
    it{is_expected.to belong_to :user}
    it{is_expected.to belong_to :static_task}

    it{is_expected.to have_many :meta_tasks}
  end

  describe "columns" do
    it{is_expected.to have_db_column(:targetable_id).of_type(:integer)}
    it{is_expected.to have_db_column(:targetable_type).of_type(:string)}
    it{is_expected.to have_db_column(:ownerable_id).of_type(:integer)}
    it{is_expected.to have_db_column(:ownerable_type).of_type(:string)}
    it{is_expected.to have_db_column(:user_id).of_type(:integer)}
    it{is_expected.to have_db_column(:status).of_type(:integer)}
    it{is_expected.to have_db_column(:type).of_type(:string)}
    it{is_expected.to have_db_column(:deleted_at).of_type(:datetime)}
  end

  describe "creation" do
    subject{described_class.create user: User.create}
    it "name of create association meta_tasks" do
      subject.meta_tasks.create
      subject.meta_tasks.create
      subject.meta_tasks.count.should eq(2)
    end
  end

  describe "validation" do
    it "is valid without user" do
      dynamic_task = DynamicTask.new targetable_id: 1, ownerable_id: 1
      dynamic_task.valid?
      expect(dynamic_task.errors[:user]).to include("can't be blank")
    end
  end

  describe "scope" do
    it "Get target_tasks" do
      DynamicTask.destroy_all
      user = User.create email: "demoab1@gmail.com", password: "123456"
      course_subject = CourseSubject.create subject_id: 1, course_id: 2
      dynamic_task_1 = DynamicTask.create user_id: user.id,
        ownerable_id: course_subject.id, ownerable_type: "CourseSubject"
        ,targetable_type: "Task"
      DynamicTask.owner_tasks(course_subject).should == [dynamic_task_1]
    end
    it "Get target_tasks" do
      DynamicTask.destroy_all
      user = User.create email: "demoab4@gmail.com", password: "123456"
      course_subject = CourseSubject.create subject_id: 1, course_id: 2
      dynamic_task_1 = DynamicTask.create user_id: user.id,
        ownerable_id: course_subject.id, ownerable_type: "CourseSubject"
        ,targetable_type: "Assignment"
      DynamicTask.target_tasks(dynamic_task_1.targetable)
        .should == [dynamic_task_1]
    end
    it "Get target_tasks" do
      DynamicTask.destroy_all
      user_1 = User.create email: "demoab7@gmail.com", password: "123456"
      user_2 = User.create email: "demoab8@gmail.com", password: "123456"
      course_subject = CourseSubject.create subject_id: 1, course_id: 2
      dynamic_task_1 = DynamicTask.create user_id: user_1.id,
        ownerable_id: course_subject.id, ownerable_type: "CourseSubject"
      dynamic_task_2 = DynamicTask.create user_id: user_2.id,
        ownerable_id: course_subject.id, ownerable_type: "CourseSubject"
      DynamicTask.team_tasks([user_1.id, user_2.id])
        .should == [dynamic_task_1, dynamic_task_2]
    end
  end

  describe "instant method" do
    it "return user_static_tasks" do
      DynamicTask.destroy_all
      user = User.create email: "demoab9@gmail.com", password: "123456"
      static_task_1 = StaticTask.create
      dynamic_task_1 = DynamicTask.create user_id: user.id
        ,targetable_id: static_task_1.id
      DynamicTask.user_static_tasks.should == [static_task_1]
    end
  end
end
