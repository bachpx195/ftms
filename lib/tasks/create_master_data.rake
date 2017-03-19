namespace :db do
  desc "remake database data"
  task create_master_data: :environment do
    Rake::Task["db:migrate:reset"].invoke
    puts "0.Creating User"
    User.create!([
      {name: "Chu Anh Tuấn",
        email: "chu.anh.tuan@framgia.com", password: "12345678",
        password_confirmation: "12345678",
        avatar: File.open(File.join(Rails.root, "app/assets/images/profile.png"))},
      {name: "Admin", email: "admin@tms.com", password: "admin@tms.com",
        password_confirmation: "admin@tms.com",
        avatar: File.open(File.join(Rails.root, "app/assets/images/profile.png"))},
      {name: "Nguyễn Bình Diệu",
        email: "nguyen.binh.dieu@framgia.com", password: "12345678",
        password_confirmation: "12345678",
        avatar: File.open(File.join(Rails.root, "app/assets/images/profile.png"))},
      {name: "Mai Tuấn Việt",
        email: "mai.tuan.viet@framgia.com", password: "12345678",
        password_confirmation: "12345678",
        avatar: File.open(File.join(Rails.root, "app/assets/images/profile.png"))},
      {name: "Hoàng Nhạc Trung",
        email: "hoang.nhac.trung@framgia.com", password: "12345678",
        password_confirmation: "12345678",
        avatar: File.open(File.join(Rails.root, "app/assets/images/profile.png"))},
      {name: "Nguyễn Tiến Trung",
        email: "nguyen.tien.trung@framgia.com", password: "12345678",
        password_confirmation: "12345678",
        avatar: File.open(File.join(Rails.root, "app/assets/images/profile.png"))},
      {name: "Hoàng Thị Nhung",
        email: "hoang.thi.nhung@framgia.com", password: "12345678",
        password_confirmation: "12345678",
        avatar: File.open(File.join(Rails.root, "app/assets/images/profile.png"))},
      {name: "Nguyễn Văn Trần Anh",
        email: "nguyen.van.tran.anh@framgia.com", password: "12345678",
        password_confirmation: "12345678",
        avatar: File.open(File.join(Rails.root, "app/assets/images/profile.png"))},
      {name: "Trần Xuân Thắng",
        email: "tran.xuan.thang@framgia.com", password: "12345678",
        password_confirmation: "12345678",
        avatar: File.open(File.join(Rails.root, "app/assets/images/profile.png"))}
    ])

    10.times do |n|
      User.create!(
        name: "Vũ Hữu Tuấn #{n+1}",
        email: "vu.huu.tuan-#{n+1}@framgia.com", password: "12345678",
        password_confirmation: "12345678",
        created_at: "01/09/2016".to_date, updated_at: "01/09/2016".to_date,
        avatar: File.open(File.join(Rails.root, "app/assets/images/profile.png"))
      )
    end

    puts "1. Create languages"
    ["Ruby", "PHP", "Android", "Java", "iOS"].each do |name|
      Language.create! name: name, description: "Master your Ruby skills and increase your Rails street cred by learning to build dynamic, sustainable applications for the web.",
        image: File.open(File.join(Rails.root,
        "app/assets/images/languages/#{name.downcase}.png"))
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

    puts "8. Create Training Standard"
    TrainingStandard.create!([
      {name: "OpenEducation 1", creator_id: 4,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."},
      {name: "OpenEducation 2", creator_id: 4,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."},
      {name: "OpenEducation 3", creator_id: 4,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."},
      {name: "OpenEducation 4", creator_id: 4,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."},
    ])
    TrainingStandard.all.each{|training_standard| training_standard.programs << Program.first}

    puts "9. Create subject"
    Subject.create!([
      {name: "Ruby on Rails Tutorial Book",
        description: "Learn the basic building blocks of Ruby, all in the browser.\r\n",
        content: "<p>Get an introduction to numbers, Strings, properties, and methods,&nbsp;
          Learn about conversions, arrays, variables, and more methods</p>\r\n",
          during_time: Settings.during_time.tutorial_book,
          image: File.open(File.join(Rails.root,
            "app/assets/images/subject.jpeg"))},
      {name: "Ruby's Project 1",
        description: "Start Project 1 for Ruby on Rails today.\r\n",
        content: "<p>Get an introduction to redmine, requirement, design database</p>\r\n",
        during_time: Settings.during_time.project_1,
        image: File.open(File.join(Rails.root,
            "app/assets/images/subject.jpeg"))},
      {name: "Ruby's Project 2",
        description: "Start Project 2 for Ruby on Rails today.\r\n",
        content: "<p>Get an introduction to redmine, requirement, design database</p>\r\n",
        during_time: Settings.during_time.project_2,
        image: File.open(File.join(Rails.root,
            "app/assets/images/subject.jpeg"))},

      {name: "Git Tutorial",
        description: "Start Git for your project today.\r\n",
        content: "<p>Get an introduction to github, code version management</p>\r\n",
        during_time: Settings.during_time.git_tutorial,
        image: File.open(File.join(Rails.root,
            "app/assets/images/subject.jpeg"))},

      {name: "Android Tutorial Book",
        description: "This tutorial will teach you basic Android programming and
          will also take you through some advance concepts related to Android application development.\r\n",
        content: "<p>Get an introduction to numbers, Strings, properties, and methods,&nbsp;
          Learn about conversions, arrays, variables, and more methods</p>\r\n",
          during_time: Settings.during_time.tutorial_book,
          image: File.open(File.join(Rails.root,
            "app/assets/images/subject.jpeg"))},
      {name: "Android's Project 1",
        description: "Start Project 1 for Android today.\r\n",
        content: "<p>Get an introduction to redmine, requirement, design database</p>\r\n",
        during_time: Settings.during_time.project_1,
        image: File.open(File.join(Rails.root,
            "app/assets/images/subject.jpeg"))},
      {name: "Android's Project 2",
        description: "Start Project 2 for Android today.\r\n",
        content: "<p>Get an introduction to redmine, requirement, design database</p>\r\n",
        during_time: Settings.during_time.project_2,
        image: File.open(File.join(Rails.root,
            "app/assets/images/subject.jpeg"))},

      {name: "PHP Tutorial Book",
        description: "PHP is a server scripting language, and a powerful tool
          for making dynamic and interactive Web pages.\r\n",
        content: "<p>Get an introduction to numbers, Strings, properties, and methods,&nbsp;
          Learn about conversions, arrays, variables, and more methods</p>\r\n",
        during_time: Settings.during_time.tutorial_book,
        image: File.open(File.join(Rails.root,
            "app/assets/images/subject.jpeg"))},
      {name: "PHP's Project 1",
        description: "Start Project 1 for PHP today.\r\n",
        content: "<p>Get an introduction to redmine, requirement, design database</p>\r\n",
        during_time: Settings.during_time.project_1,
        image: File.open(File.join(Rails.root,
            "app/assets/images/subject.jpeg"))},
      {name: "PHP's Project 2",
        description: "Start Project 2 for PHP today.\r\n",
        content: "<p>Get an introduction to redmine, requirement, design database</p>\r\n",
        during_time: Settings.during_time.project_2,
        image: File.open(File.join(Rails.root,
            "app/assets/images/subject.jpeg"))},
      {name: "MySQL", description: "Start MySQL today.\r\n", content: "MySQL",
        during_time: Settings.during_time.mysql},
      {name: "JavaScript", description: "JavaScript is the programming language of HTML and the Web.
        Programming makes computers do what you want them to do. JavaScript is easy to learn.
        This tutorial will teach you JavaScript from basic to advanced.",
        during_time: Settings.during_time.javascript,
      image: File.open(File.join(Rails.root,
            "app/assets/images/subject.jpeg"))}
    ])
    puts "10. Create user programs"
    2.times do |n|
      UserProgram.create! program_id: n+1,  user_id: 1
      UserProgram.create! program_id: n+1,  user_id: 4
      UserProgram.create! program_id: n+1,  user_id: 5
      UserProgram.create! program_id: n+1,  user_id: 6
    end

    10.times do |n|
      UserProgram.create! program_id: 1,  user_id: n+10
      UserProgram.create! program_id: 2,  user_id: n+10
    end

    puts "11. Create courses"
    Course.create!([
      {name: "Laboratory Rails", description: "Lorem Ipsum", status: "in_progress",
        language_id: 1, start_date: "01/01/2001", end_date: "01/01/2021",
        program_id: 1, training_standard_id: 1, creator_id: 4, owner_id: 1,
        image: File.open(File.join(Rails.root, "app/assets/images/edu.jpg"))},
      {name: "Laboratory PHP", description: "Lorem Ipsum", status: "in_progress",
        language_id: 2, start_date: "01/01/2001", end_date: "01/01/2021",
        program_id: 1, training_standard_id: 1, creator_id: 4, owner_id: 1,
        image: File.open(File.join(Rails.root, "app/assets/images/edu.jpg"))},
      {name: "Laboratory Android", description: "Lorem Ipsum", status: "finished",
        language_id: 2, start_date: "01/01/2001", end_date: "01/01/2021",
        program_id: 1, training_standard_id: 1, creator_id: 4, owner_id: 1,
        image: File.open(File.join(Rails.root, "app/assets/images/edu.jpg"))},
      {name: "Laboratory Rails", description: "Lorem Ipsum", status: "in_progress",
        language_id: 1, start_date: "01/01/2001", end_date: "01/01/2021",
        program_id: 1, training_standard_id: 2, creator_id: 4, owner_id: 1,
        image: File.open(File.join(Rails.root, "app/assets/images/edu.jpg"))},
      {name: "Laboratory PHP", description: "Lorem Ipsum", status: "in_progress",
        language_id: 2, start_date: "01/01/2001", end_date: "01/01/2021",
        program_id: 1, training_standard_id: 2, creator_id: 4, owner_id: 1,
        image: File.open(File.join(Rails.root, "app/assets/images/edu.jpg"))},
      {name: "Laboratory Android", description: "Lorem Ipsum", status: "finished",
        language_id: 2, start_date: "01/01/2001", end_date: "01/01/2021",
        program_id: 1, training_standard_id: 2, creator_id: 4, owner_id: 1,
        image: File.open(File.join(Rails.root, "app/assets/images/edu.jpg"))},
      {name: "Laboratory Rails", description: "Lorem Ipsum", status: "in_progress",
        language_id: 1, start_date: "01/01/2001", end_date: "01/01/2021",
        program_id: 1, training_standard_id: 3, creator_id: 4, owner_id: 1,
        image: File.open(File.join(Rails.root, "app/assets/images/edu.jpg"))},
      {name: "Laboratory PHP", description: "Lorem Ipsum", status: "in_progress",
        language_id: 2, start_date: "01/01/2001", end_date: "01/01/2021",
        program_id: 1, training_standard_id: 3, creator_id: 4, owner_id: 1,
        image: File.open(File.join(Rails.root, "app/assets/images/edu.jpg"))},
      {name: "Laboratory Android", description: "Lorem Ipsum", status: "finished",
        language_id: 2, start_date: "01/01/2001", end_date: "01/01/2021",
        program_id: 1, training_standard_id: 3, creator_id: 4, owner_id: 1,
        image: File.open(File.join(Rails.root, "app/assets/images/edu.jpg"))},
      {name: "Laboratory Rails", description: "Lorem Ipsum", status: "in_progress",
        language_id: 1, start_date: "01/01/2001", end_date: "01/01/2021",
        program_id: 1, training_standard_id: 4, creator_id: 4, owner_id: 1,
        image: File.open(File.join(Rails.root, "app/assets/images/edu.jpg"))},
      {name: "Laboratory PHP", description: "Lorem Ipsum", status: "in_progress",
        language_id: 2, start_date: "01/01/2001", end_date: "01/01/2021",
        program_id: 1, training_standard_id: 4, creator_id: 4, owner_id: 1,
        image: File.open(File.join(Rails.root, "app/assets/images/edu.jpg"))},
      {name: "Laboratory Android", description: "Lorem Ipsum", status: "finished",
        language_id: 2, start_date: "01/01/2001", end_date: "01/01/2021",
        program_id: 1, training_standard_id: 4, creator_id: 4, owner_id: 1,
        image: File.open(File.join(Rails.root, "app/assets/images/edu.jpg"))},
    ])

    puts "12. Create user subject"
    UserSubject.create!([
      {user_id: 1, start_date: '01/09/2016', end_date: '01/01/2021',
        status: 0},
      {user_id: 2, start_date: '01/09/2016', end_date: '01/01/2021',
        status: 0}
    ])

    puts "13. Crawl function"
    Function.create controller_name: "organizations", action: "index"

    functions = []
    def check_supply object
      object[:controller] && object[:action] && !/^rails\/\d*/.match(object[:controller]) && object[:controller] != "sessions"
    end
    Rails.application.routes.routes.map do |router|
      functions.push controller_name: router.defaults[:controller],
        action: router.defaults[:action], parent_id: 1 if check_supply router.defaults
    end
    functions.uniq.each do |f|
      Function.create! f
    end

    puts "14. Create role"
    Role.create!([
      {name: "admin"},
      {name: "organization supervior", parent_id: 1},
      {name: "program supervior", parent_id: 1}
    ])

    puts "16. create CourseManager"
    CourseManager.create!([
      {user_id: 4, course_id: 1, status: "process"},
      {user_id: 1, course_id: 1, status: "process"},
      {user_id: 2, course_id: 1, status: "process"},
      {user_id: 4, course_id: 2, status: "process"},
      {user_id: 4, course_id: 3, status: "process"},
      {user_id: 6, course_id: 1, status: "process"},
      {user_id: 6, course_id: 2, status: "process"},
      {user_id: 6, course_id: 3, status: "process"},
    ])

    puts "17. create Profile"
    Profile.create!([
      {user_id: 4, language_id: 1, organization_id: 2, program_id: 1,
        staff_code: "B123456"},
      {user_id: 6, language_id: 1, organization_id: 2, program_id: 1,
        staff_code: "B123457"},
    ])

    puts "18. Create Evaluation templates"
    EvaluationTemplate.create!([
      {training_standard_id: 1, name: "Evaluation template 1"},
      {training_standard_id: 2, name: "Evaluation template 2"},
      {training_standard_id: 3, name: "Evaluation template 3"},
      {training_standard_id: 4, name: "Evaluation template 4"}
    ])

    puts "18. create Role"
    Role.create!([
      {name: "admin"},
      {name: "GL"},
      {name: "trainer"},
      {name: "trainee"}
    ])

    puts "19. create RoleFunction"
    Role.all.each do |role|
      Function.all.each do |function|
        RoleFunction.create! role_id: role.id, function_id: function.id
      end
    end

    puts "20. create UserRole"
    role = Role.find_by id: 1
    User.all.limit(9).each do |user|
      UserRole.create! user_id: user.id, role_id: 1
      user.functions = role.functions
    end
  end
end
