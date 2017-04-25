namespace :db do
  desc "remake database data"
  task db_fake: :environment do
    Rake::Task["db:migrate:reset"].invoke
    puts "0.Creating Trainer"
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
        avatar: File.open(File.join(Rails.root, "app/assets/images/profile.png"))},
        {name: "Vu Huu Tuan",
        email: "vu.huu.tuan@framgia.com", password: "12345678",
        password_confirmation: "12345678",
        avatar: File.open(File.join(Rails.root, "app/assets/images/profile.png"))}
    ])

    puts "1. Create role"
    Role.create!([
      {name: "admin"},
      {name: "organization supervior", parent_id: 1},
      {name: "program supervior", parent_id: 1},
      {name: "GL", parent_id: 1},
      {name: "trainer", parent_id: 1},
      {name: "trainee", parent_id: 1}
    ])

    puts "2. Crawl function & trainee"
    functions = []
    def check_supply object
      object[:controller] && object[:action] && !/^rails\/\d*/.match(object[:controller]) &&
        object[:controller] != "sessions" && !/^(new|edit)$/.match(object[:action]) &&
        (object[:controller] != "organizations" || object[:action] != "index") &&
        (object[:controller] != "users" || object[:action] != "show")
    end

    function = Function.create! controller_name: "organizations", action: "index"
    function = Function.create! controller_name: "users", action: "show"

    Rails.application.routes.routes.map do |router|
      functions.push controller_name: router.defaults[:controller],
        action: router.defaults[:action], parent_id: 1 if check_supply router.defaults
    end

    functions.uniq.each do |f|
      Function.create! f
    end

    f1 = Function.find_by controller_name: "users", action: "show"
    f2 = Function.find_by controller_name: "courses", action: "show"
    f4 = Function.find_by controller_name: "subjects", action: "show"
    f5 = Function.find_by controller_name: "my_space/courses", action: "index"
    f6 = Function.find_by controller_name: "my_space/courses", action: "show"
    f7 = Function.find_by controller_name: "meta_tasks", action: "index"
    f8 = Function.find_by controller_name: "meta_tasks", action: "create"
    f9 = Function.find_by controller_name: "meta_tasks", action: "show"
    f10 = Function.find_by controller_name: "meta_tasks", action: "update"
    f11 = Function.find_by controller_name: "meta_tasks", action: "destroy"
    f12 = Function.find_by controller_name: "assignments", action: "create"
    f13 = Function.find_by controller_name: "my_space/exams", action: "index"
    f14 = Function.find_by controller_name: "exams", action: "show"
    f15 = Function.find_by controller_name: "exams", action: "update"
    f16 = Function.find_by controller_name: "exams", action: "create"
    f17 = Function.find_by controller_name: "users", action: "edit"

    200.times do |n|
      user = User.create!(
        name: Faker::Name.name(),
        email: "vu.huu.tuan-#{n+1}@framgia.com", password: "12345678",
        password_confirmation: "12345678",
        created_at: "01/09/2016".to_date, updated_at: "01/09/2016".to_date,
        avatar: File.open(File.join(Rails.root, "app/assets/images/profile.png"))
      )
      UserFunction.create!([
        {user: user, function: f1},
        {user: user, function: f2},
        {user: user, function: f4},
        {user: user, function: f5},
        {user: user, function: f6},
        {user: user, function: f7},
        {user: user, function: f8},
        {user: user, function: f9},
        {user: user, function: f10},
        {user: user, function: f11},
        {user: user, function: f12},
        {user: user, function: f13},
        {user: user, function: f14},
        {user: user, function: f15},
        {user: user, function: f16},
        {user: user, function: f17}
      ])
    end
    RoleFunction.create!([
      {role_id: 6, function: f1},
      {role_id: 6, function: f2},
      {role_id: 6, function: f4},
      {role_id: 6, function: f5},
      {role_id: 6, function: f6},
      {role_id: 6, function: f7},
      {role_id: 6, function: f8},
      {role_id: 6, function: f9},
      {role_id: 6, function: f10},
      {role_id: 6, function: f11},
      {role_id: 6, function: f12},
      {role_id: 6, function: f13},
      {role_id: 6, function: f14},
      {role_id: 6, function: f15},
      {role_id: 6, function: f16},
      {role_id: 6, function: f17},
    ])

    puts "2. Create languages"
    ["Ruby", "PHP", "Android", "Java", "iOS"].each do |name|
      Language.create! name: name,
        description: "Master your Ruby skills and increase your Rails street cred by learning to build dynamic, sustainable applications for the web.",
        creator_id: 1, image: File.open(File.join(Rails.root,
        "app/assets/images/languages/#{name.downcase}.png"))
    end

    puts "3. Create Universities"
    ["Vietnam National University, Hanoi", "Hanoi University of Science and Technology",
      "Foreign Trade University",
      "Posts and Telecommunications Institute of Technology",
      "Hanoi University of Industry"].each do |name|
      University.create! name: name, creator_id: 1
    end

    puts "4. Create Stage"
    ["In Education", "Joined Div", "Away", "Resigned"].each do |name|
      Stage.create! name: name, creator_id: 1
    end

    puts "5. Trainee types"
    ["Practice", "Intern", "OpenEducation", "New Dev", "Naitei"].each do |name|
      TraineeType.create! name: name
    end

    puts "6. User status"
    ["In progress", "Finished", "Away", "Pending"].each do |name|
      UserStatus.create! name: name
    end

    puts "7. Create organization"
      Organization.create!([
        {name: "Framgia", user_id: 1, parent_id: nil, creator_id: 1},
        {name: "Framgia Labo", user_id: 1, parent_id: 1, creator_id: 1},
        {name: "Framgia Toong", user_id: 1, parent_id: 1, creator_id: 1},
        {name: "Framgia Da Nang ", user_id: 1, parent_id: 1, creator_id: 1},
        {name: "Framgia Ho Chi Minh", user_id: 1, parent_id: 1, creator_id: 1}])

    puts "8. Create program"
    Program.create!([
      {name: "OpenEducation", program_type: 1, organization_id: 2, creator_id: 1},
      {name: "Internal Training", program_type: 2, organization_id: 2, creator_id: 1},

      {name: "OpenEducation Labo", program_type: 1, organization_id: 2, parent_id: 1, creator_id: 1},
      {name: "OpenEducation Da Nang", program_type: 1, organization_id: 3, parent_id: 1, creator_id: 1},

      {name: "Internal Training Labo", program_type: 2, organization_id: 2, parent_id: 2, creator_id: 1},
      {name: "Internal Training Toong", program_type: 2, organization_id: 2, parent_id: 2, creator_id: 1},
      {name: "Internal Training Da Nang", program_type: 2,
        organization_id: 3, parent_id: 2, creator_id: 1}
    ])

    puts "9. Create Training Standard"
    TrainingStandard.create!([
      {name: "OpenEducation Da Nang", creator_id: 5, organization_id: 3, policy: 1,
        description: "Training Standard for opend education in Da Nang"},
      {name: "Internal Training Da Nang", creator_id: 5, organization_id: 3, policy: 0,
        description: "Training Standard for internal training in Da Nang"},

      {name: "OpenEducation Labo", creator_id: 4, organization_id: 2, policy: 1,
        description: "Training Standard for open education in Labo"},
      {name: "Internal Training Labo", creator_id: 4, organization_id: 2, policy: 0,
        description: "Training Standard for internal training in Labo"},

      {name: "Internal Training Toong", creator_id: 3, organization_id: 2, policy: 0,
        description: "Training Standard for internal training in Toong"}
    ])

    ShareWith.create!([
      {organization_id: 3, training_standard_id: 1},
      {organization_id: 3, training_standard_id: 2},
      {organization_id: 3, training_standard_id: 3},
      {organization_id: 3, training_standard_id: 4},
      {organization_id: 4, training_standard_id: 1},
      {organization_id: 4, training_standard_id: 2}
    ])

    puts "10. Create subject"
    Subject.create!([
      {name: "Ruby on Rails Tutorial Book", creator_id: 1,
        description: "Learn the basic building blocks of Ruby, all in the browser.\r\n",
        organization_id: 2,
        content: "<p>Get an introduction to numbers, Strings, properties, and methods,&nbsp;
          Learn about conversions, arrays, variables, and more methods</p>\r\n",
          during_time: Settings.during_time.tutorial_book,
          image: File.open(File.join(Rails.root,
            "app/assets/images/subject.jpeg"))},
      {name: "Ruby's Project 1", creator_id: 1,
        description: "Start Project 1 for Ruby on Rails today.\r\n",
        organization_id: 2,
        content: "<p>Get an introduction to redmine, requirement, design database</p>\r\n",
        during_time: Settings.during_time.project_1,
        image: File.open(File.join(Rails.root,
          "app/assets/images/subject.jpeg"))},
      {name: "Ruby's Project 2", creator_id: 1,
        description: "Start Project 2 for Ruby on Rails today.\r\n",
        organization_id: 2,
        content: "<p>Get an introduction to redmine, requirement, design database</p>\r\n",
        during_time: Settings.during_time.project_2,
        image: File.open(File.join(Rails.root,
          "app/assets/images/subject.jpeg"))},

      {name: "Git Tutorial", creator_id: 1,
        description: "Start Git for your project today.\r\n",
        organization_id: 2,
        content: "<p>Get an introduction to github, code version management</p>\r\n",
        during_time: Settings.during_time.git_tutorial,
        image: File.open(File.join(Rails.root,
          "app/assets/images/subject.jpeg"))},

      {name: "Android Tutorial Book", creator_id: 1,
        description: "This tutorial will teach you basic Android programming and
          will also take you through some advance concepts related to Android application development.\r\n",
          organization_id: 2,
        content: "<p>Get an introduction to numbers, Strings, properties, and methods,&nbsp;
          Learn about conversions, arrays, variables, and more methods</p>\r\n",
          during_time: Settings.during_time.tutorial_book,
          image: File.open(File.join(Rails.root,
            "app/assets/images/subject.jpeg"))},

      {name: "Android's Project 1", creator_id: 1,
        description: "Start Project 1 for Android today.\r\n",
        organization_id: 2,
        content: "<p>Get an introduction to redmine, requirement, design database</p>\r\n",
        during_time: Settings.during_time.project_1,
        image: File.open(File.join(Rails.root,
          "app/assets/images/subject.jpeg"))},
      {name: "Android's Project 2", creator_id: 1,
        description: "Start Project 2 for Android today.\r\n",
        organization_id: 2,
        content: "<p>Get an introduction to redmine, requirement, design database</p>\r\n",
        during_time: Settings.during_time.project_2,
        image: File.open(File.join(Rails.root,
          "app/assets/images/subject.jpeg"))},

      {name: "PHP Tutorial Book", creator_id: 1,
        description: "PHP is a server scripting language, and a powerful tool
          for making dynamic and interactive Web pages.\r\n",
        organization_id: 2,
        content: "<p>Get an introduction to numbers, Strings, properties, and methods,&nbsp;
          Learn about conversions, arrays, variables, and more methods</p>\r\n",
        during_time: Settings.during_time.tutorial_book,
        image: File.open(File.join(Rails.root,
          "app/assets/images/subject.jpeg"))},
      {name: "PHP's Project 1", creator_id: 1,
        description: "Start Project 1 for PHP today.\r\n",
        organization_id: 2,
        content: "<p>Get an introduction to redmine, requirement, design database</p>\r\n",
        during_time: Settings.during_time.project_1,
        image: File.open(File.join(Rails.root,
          "app/assets/images/subject.jpeg"))},
      {name: "PHP's Project 2", creator_id: 1,
        description: "Start Project 2 for PHP today.\r\n",
        organization_id: 2,
        content: "<p>Get an introduction to redmine, requirement, design database</p>\r\n",
        during_time: Settings.during_time.project_2,
        image: File.open(File.join(Rails.root,
          "app/assets/images/subject.jpeg"))},
      {name: "MySQL", description: "Start MySQL today.\r\n",
        organization_id: 2, content: "MySQL", creator_id: 1,
        during_time: Settings.during_time.mysql},

      {name: "RSpec", description: "Start RSpec today.\r\n",
        organization_id: 2, content: "MySQL", creator_id: 1,
        during_time: Settings.during_time.mysql},

      {name: "JavaScript", description: "JavaScript is the programming language of HTML and the Web.
        Programming makes computers do what you want them to do. JavaScript is easy to learn.
        This tutorial will teach you JavaScript from basic to advanced.",
        organization_id: 2, creator_id: 1,
        during_time: Settings.during_time.javascript,
        image: File.open(File.join(Rails.root,
        "app/assets/images/subject.jpeg"))}
    ])


    puts "24. create Assignment"

    Assignment.create! name: "Ruby book in 2 days",
      content: "Ruby language", organization_id: 2, creator_id: 4
    Assignment.create! name: "From zero to deploy", content: "Get an introduction to numbers, Strings, properties, and methods language", organization_id: 2, creator_id: 4
    Assignment.create! name: "A toy app", content: "Get an introduction to numbers, Strings, properties, and methods language", organization_id: 2, creator_id: 4
    Assignment.create! name: "Mostly static pages", content: "Get an introduction to numbers, Strings, properties, and methods language", organization_id: 2, creator_id: 4
    Assignment.create! name: "Rails-flavored Ruby", content: "Get an introduction to numbers, Strings, properties, and methods language", organization_id: 2, creator_id: 4
    Assignment.create! name: "Filling in the layout", content: "Get an introduction to numbers, Strings, properties, and methods language", organization_id: 2, creator_id: 4
    Assignment.create! name: "Modeling users", content: "Get an introduction to numbers, Strings, properties, and methods language", organization_id: 2, creator_id: 4
    Assignment.create! name: "Sign up", content: "Get an introduction to numbers, Strings, properties, and methods language", organization_id: 2, creator_id: 4
    Assignment.create! name: "Basic login", content: "Get an introduction to numbers, Strings, properties, and methods language", organization_id: 2, creator_id: 4
    Assignment.create! name: "Advanced login", content: "Get an introduction to numbers, Strings, properties, and methods language", organization_id: 2, creator_id: 4
    Assignment.create! name: "Updating, showing, and deleting users", content: "Get an introduction to numbers, Strings, properties, and methods language", organization_id: 2, creator_id: 4
    Assignment.create! name: "Account activation", content: "Get an introduction to numbers, Strings, properties, and methods language", organization_id: 2, creator_id: 4
    Assignment.create! name: "Password reset", content: "Get an introduction to numbers, Strings, properties, and methods language", organization_id: 2, creator_id: 4
    Assignment.create! name: "User microposts", content: "Get an introduction to numbers, Strings, properties, and methods language", organization_id: 2, creator_id: 4
    Assignment.create! name: "Following users", content: "Get an introduction to numbers, Strings, properties, and methods language", organization_id: 2, creator_id: 4

    Assignment.all.each do |assignment|
      StaticTask.create targetable: assignment, ownerable: Subject.first
    end

    Assignment.create! name: "Requirement understanding", content: "Get an introduction to project understanding", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(2)
    Assignment.create! name: "Design Database", content: "Start design database", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(2)

    Assignment.create! name: "Requirement understanding", content: "Get an introduction to project understanding", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(3)
    Assignment.create! name: "Design Database", content: "Start design database", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(3)

    Assignment.create! name: "Getting Started", content: "Get an introduction to project git", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(4)

    Assignment.create! name: "Git Basics", content: "Get an introduction to project git", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(4)

    Assignment.create! name: "Git Branching", content: "Get an introduction to project git", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(4)

    Assignment.create! name: "Git on the Server", content: "Get an introduction to project git", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(4)

    Assignment.create! name: "Distributed Git", content: "Get an introduction to project git", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(4)

    Assignment.create! name: "GitHub", content: "Get an introduction to project git", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(4)

    Assignment.create! name: "Customizing Git", content: "Get an introduction to project git", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(4)

    Assignment.create! name: "Git and Other Systems", content: "Get an introduction to project git", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(4)

    Assignment.create! name: "Git Internals", content: "Get an introduction to project git", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(4)

    Assignment.create! name: "Installing environment", content: " Start your research with Android", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(5)
    Assignment.create! name: "Learn about Android architecture", content: " Start your research with Android", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(5)
    Assignment.create! name: "Learn about basic components of an Android application", content: " Start your research with Android", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(5)
    Assignment.create! name: "Learn about resources in Android", content: " Start your research with Android", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(5)
    Assignment.create! name: "Activity", content: " Start your research with Android", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(5)
    Assignment.create! name: "UI layout", content: " Start your research with Android", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(5)
    Assignment.create! name: "UI Controls", content: " Start your research with Android", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(5)
    Assignment.create! name: "Event Handling", content: " Start your research with Android", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(5)
    Assignment.create! name: "Animation", content: " Start your research with Android", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(5)
    Assignment.create! name: "Database", content: " Start your research with Android", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(5)
    Assignment.create! name: "Some other components", content: " Start your research with Android", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(5)
    Assignment.create! name: "Some other issues", content: " Start your research with Android", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(5)
    Assignment.create! name: "Thread", content: " Start your research with Android", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(5)

    Assignment.create! name: "Requirement understanding", content: "Get an introduction to project understanding", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(6)
    Assignment.create! name: "Requirement understanding", content: "Get an introduction to project understanding", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(7)

    Assignment.create! name: "Introduction to Laravel", content: "Get an introduction to Laravel", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(8)
    Assignment.create! name: "Installation", content: "Get an introduction to Laravel", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(8)
    Assignment.create! name: "Routing", content: "Get an introduction to Laravel", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(8)
    Assignment.create! name: "Middleware", content: "Get an introduction to Laravel", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(8)
    Assignment.create! name: "Controllers", content: "Get an introduction to Laravel", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(8)
    Assignment.create! name: "Request Lifecycle", content: "Get an introduction to Laravel", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(8)
    Assignment.create! name: "Application Structure", content: "Get an introduction to Laravel", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(8)
    Assignment.create! name: "Authentication", content: "Get an introduction to Laravel", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(8)
    Assignment.create! name: "Encryption", content: "Get an introduction to Laravel", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(8)
    Assignment.create! name: "Filesystem / Cloud Storage ", content: "Get an introduction to Laravel", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(8)

    Assignment.create! name: "Requirement understanding", content: "Get an introduction to project understanding", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(9)
    Assignment.create! name: "Requirement understanding", content: "Get an introduction to project understanding", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(10)

    Assignment.create! name: "Modeling and Designing Databases", content: "Get an introduction to project understanding", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(11)
    Assignment.create! name: "Basic SQL ", content: "Get an introduction to project understanding", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(11)
    Assignment.create! name: "Working with Database Structures", content: "Get an introduction to project understanding", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(11)
    Assignment.create! name: "Advanced Querying", content: "Get an introduction to project understanding", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(11)
    Assignment.create! name: "Doing More with MySQL", content: "Get an introduction to project understanding", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(11)
    Assignment.create! name: "Managing Users and Privileges", content: "Get an introduction to project understanding", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(11)

    Assignment.create! name: "RSpec", content: "RSpec", organization_id: 2, creator_id: 4
    StaticTask.create! targetable: Assignment.last, ownerable: Subject.find(12)

    puts "12. Creat StandardSubject"
    TrainingStandard.all.each do |training_standard|
      training_standard.subjects << Subject.limit(5)
    end

    puts "18. create Profile"
    User.all.each do |user|
      Profile.create!([
        {user: user, organization_id: 2, program: Program.all.sample,
          stage: Stage.all.sample, organization: Organization.all.sample,
          university: University.all.sample,
          staff_code: "#{user.id + 1}", trainee_type: TraineeType.all.sample,
          user_status: UserStatus.all.sample, language: Language.all.sample,
          start_training_date: (0..10).to_a.sample.months.ago
        },
      ])
    end

    User.order(created_at: :desc).last(50).each do |user|
      user.profile.update_attributes finish_training_date: ((1..3).to_a.sample.months.ago)
    end

    User.all.sample(20).each do|user|
      user.profile.update_attributes leave_date: ((0..3).to_a.sample.months.ago)
    end

    puts "21. create RoleFunction"
    Role.all.limit(3).each do |role|
      Function.all.each do |function|
        RoleFunction.create! role_id: role.id, function_id: function.id
      end
    end

    puts "22. create UserRole"
    role = Role.find_by id: 1
    User.all.limit(9).each do |user|
      UserRole.create! user_id: user.id, role_id: 1
      UserRole.create! user_id: user.id, role_id: 5
      user.functions = role.functions
    end

    puts "32. Create Moving History"
    5.times do |n|
      user = User.find_by id: n + 11
      MovingHistory.create user_id: user.id, organization_id: 3,
        sourceable: user.courses.first, destinationable: Course.last, move_date: "06/09/2017"
    end
  end
end
