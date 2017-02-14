namespace :db do
  desc "remake database data"
  task create_user: :environment do
    puts "0.Creating User"
    Admin.create!([
      {name: "Chu Anh Tuấn",
        email: "chu.anh.tuan@framgia.com", password: "12345678",
        password_confirmation: "12345678"},
      {name: "Admin", email: "admin@tms.com", password: "admin@tms.com",
        password_confirmation: "admin@tms.com"}
    ])

    Trainer.create!([
      {name: "Nguyễn Bình Diệu",
        email: "nguyen.binh.dieu@framgia.com", password: "12345678",
        password_confirmation: "12345678"},
      {name: "Mai Tuấn Việt",
        email: "mai.tuan.viet@framgia.com", password: "12345678",
        password_confirmation: "12345678"},
      {name: "Hoàng Nhạc Trung",
        email: "hoang.nhac.trung@framgia.com", password: "12345678",
        password_confirmation: "12345678"},
      {name: "Nguyễn Tiến Trung",
        email: "nguyen.tien.trung@framgia.com", password: "12345678",
        password_confirmation: "12345678"},
      {name: "Hoàng Thị Nhung",
        email: "hoang.thi.nhung@framgia.com", password: "12345678",
        password_confirmation: "12345678"},
      {name: "Nguyễn Văn Trần Anh",
        email: "nguyen.van.tran.anh@framgia.com", password: "12345678",
        password_confirmation: "12345678"},
      {name: "Trần Xuân Thắng",
        email: "tran.xuan.thang@framgia.com", password: "12345678",
        password_confirmation: "12345678"}
    ])

    Trainee.create!([
      {name: "Vũ Hữu Tuấn ",
        email: "vu.huu.tuan@framgia.com", password: "12345678",
        password_confirmation: "12345678",
        created_at: "01/09/2016".to_date, updated_at: "01/09/2016".to_date}
    ])

    puts "1. Create languages"
    ["Ruby", "PHP", "Android", "Java", "iOS"].each do |name|
      Language.create! name: name
    end

    puts "2. Create Universities"
    ["Vietnam National University, Hanoi", "Hanoi University of Science and Technology",
      "Foreign Trade University",
      "Posts and Telecommunications Institute of Technology",
      "Hanoi University of Industry"].each do |name|
      University.create! name: name
    end

    puts "3. Create Stage"
    ["Intern", "VPG", "JPG", "New dev", "QA"].each do |name|
      Stage.create! name: name
    end

    puts "4. Trainee types"
    ["Practice", "Intern", "OpenEducation", "Hust Intern", "Da Nang Education"].each do |name|
      TraineeType.create! name: name
    end

    puts "5. User status"
    ["Studying", "Project preparation work", "Doning project",
      "Doing Internal Project", "Finish training", "Pending"].each do |name|
      UserStatus.create! name: name
    end

    puts "6. Create organization"
    user = User.first
    if user
      Organization.create!([
        {name: "Framgia", user_id: user.id, parent_id: nil},
        {name: "Framgia Ha noi Education", user_id: user.id, parent_id: 1},
        {name: "Framgia Da nang ", user_id: user.id, parent_id: 1},
        {name: "Framgia Ho Chi Minh", user_id: user.id, parent_id: 1},
        {name: "Hust Education", user_id: user.id, parent_id: nil},
        {name: "Ta Quang Buu Lab", user_id: user.id, parent_id: 5},
        {name: "Janpan JAV Education", user_id: user.id, parent_id: nil}])
    end
  end
end
