namespace :db do
  desc "remake database data"
  task create_master_data: :environment do
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


    puts "7. Create program"
    Program.create!([
      {name: "OpenEducation", program_type: 1, organization_id: 2},
      {name: "OpenEducation batch 1", program_type: 1, organization_id: 2, parent_id: 1}
    ])

    puts "8. Create subject"
    Subject.create!([
      {name: "Ruby on Rails Tutorial Book",
        description: "Learn the basic building blocks of Ruby, all in the browser.\r\n",
        content: "<p>Get an introduction to numbers, Strings, properties, and methods,&nbsp;
          Learn about conversions, arrays, variables, and more methods</p>\r\n", during_time: Settings.during_time.tutorial_book},
      {name: "Ruby's Project 1",
        description: "Start Project 1 for Ruby on Rails today.\r\n",
        content: "<p>Get an introduction to redmine, requirement, design database</p>\r\n", during_time: Settings.during_time.project_1},
      {name: "Ruby's Project 2",
        description: "Start Project 2 for Ruby on Rails today.\r\n",
        content: "<p>Get an introduction to redmine, requirement, design database</p>\r\n", during_time: Settings.during_time.project_2},

      {name: "Git Tutorial",
        description: "Start Git for your project today.\r\n",
        content: "<p>Get an introduction to github, code version management</p>\r\n", during_time: Settings.during_time.git_tutorial},

      {name: "Android Tutorial Book",
        description: "This tutorial will teach you basic Android programming and
          will also take you through some advance concepts related to Android application development.\r\n",
        content: "<p>Get an introduction to numbers, Strings, properties, and methods,&nbsp;
          Learn about conversions, arrays, variables, and more methods</p>\r\n",
          during_time: Settings.during_time.tutorial_book},
      {name: "Android's Project 1",
        description: "Start Project 1 for Android today.\r\n",
        content: "<p>Get an introduction to redmine, requirement, design database</p>\r\n",
        during_time: Settings.during_time.project_1},
      {name: "Android's Project 2",
        description: "Start Project 2 for Android today.\r\n",
        content: "<p>Get an introduction to redmine, requirement, design database</p>\r\n", during_time: Settings.during_time.project_2},

      {name: "PHP Tutorial Book",
        description: "PHP is a server scripting language, and a powerful tool
          for making dynamic and interactive Web pages.\r\n",
        content: "<p>Get an introduction to numbers, Strings, properties, and methods,&nbsp;
          Learn about conversions, arrays, variables, and more methods</p>\r\n",
        during_time: Settings.during_time.tutorial_book},
      {name: "PHP's Project 1",
        description: "Start Project 1 for PHP today.\r\n",
        content: "<p>Get an introduction to redmine, requirement, design database</p>\r\n",
        during_time: Settings.during_time.project_1},
      {name: "PHP's Project 2",
        description: "Start Project 2 for PHP today.\r\n",
        content: "<p>Get an introduction to redmine, requirement, design database</p>\r\n",
        during_time: Settings.during_time.project_2},
      {name: "MySQL", description: "Start MySQL today.\r\n", content: "MySQL",
        during_time: Settings.during_time.mysql},
      {name: "JavaScript", description: "JavaScript is the programming language of HTML and the Web.
        Programming makes computers do what you want them to do. JavaScript is easy to learn.
        This tutorial will teach you JavaScript from basic to advanced.",
        during_time: Settings.during_time.javascript}
    ])
  end
end
