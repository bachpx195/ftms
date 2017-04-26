namespace :db do
  desc "remake database data"
  task create_master_data: :environment do
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

    10.times do |n|
      user = User.create!(
        name: "Vũ Hữu Tuấn #{n+1}",
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
      Language.create! name: name, description: "Master your Ruby skills and increase your Rails street cred by learning to build dynamic, sustainable applications for the web.",
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
    ["Studying", "Project preparation work", "Doing project",
      "Doing Internal Project", "Finish training", "Pending"].each do |name|
      UserStatus.create! name: name
    end

    puts "7. Create organization"
    user = User.first
    if user
      Organization.create!([
        {name: "Framgia", user_id: user.id, parent_id: nil, creator_id: 1},
        {name: "Framgia Ha Noi Education", user_id: user.id, parent_id: 1, creator_id: 1},
        {name: "Framgia Da Nang ", user_id: user.id, parent_id: 1, creator_id: 1},
        {name: "Framgia Ho Chi Minh", user_id: user.id, parent_id: 1, creator_id: 1},
        {name: "HUST Education", user_id: user.id, parent_id: nil, creator_id: 1},
        {name: "Ta Quang Buu Lab", user_id: user.id, parent_id: 5, creator_id: 1}])
    end

    puts "8. Create program"
    Program.create!([
      {name: "OpenEducation", program_type: 1, organization_id: 2, creator_id: 1},
      {name: "OpenEducation batch 1", program_type: 1, organization_id: 2, parent_id: 1, creator_id: 1}
    ])

    puts "9. Create Training Standard"
    TrainingStandard.create!([
      {name: "OpenEducation 1", creator_id: 4, organization_id: 2, policy: 0,
        description: "Lorem Ipsum is simply dummy <te></te>xt of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."},
      {name: "OpenEducation 2", creator_id: 4, organization_id: 2, policy: 1,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."},
      {name: "OpenEducation 3", creator_id: 4, organization_id: 2, policy: 0,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."},
      {name: "OpenEducation 4", creator_id: 4, organization_id: 2, policy: 0,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."},
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
      {name: "JavaScript", description: "JavaScript is the programming language of HTML and the Web.
        Programming makes computers do what you want them to do. JavaScript is easy to learn.
        This tutorial will teach you JavaScript from basic to advanced.",
        organization_id: 2, creator_id: 1,
        during_time: Settings.during_time.javascript,
      image: File.open(File.join(Rails.root,
        "app/assets/images/subject.jpeg"))}
    ])

    puts "11. Create user programs"
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

    puts "12. Create StandardSubject"
    TrainingStandard.all.each do |training_standard|
      training_standard.subjects << Subject.limit(5)
    end

    puts "13. Create courses"
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

    puts "14. Create course subject"
    Course.all.each do |course|
      course.training_standard.subjects.each do |subject|
        course.course_subjects.create subject_id: subject.id, subject_name: subject.name,
          subject_description: subject.description, subject_content: subject.content,
          subject_image: subject.image
      end
    end

    puts "15. Create User Course"
    CourseManager.create!([
      {user_id: 4, course_id: 1, status: "in_progress"},
      {user_id: 1, course_id: 1, status: "in_progress"},
      {user_id: 2, course_id: 1, status: "in_progress"},
      {user_id: 4, course_id: 2, status: "in_progress"},
      {user_id: 4, course_id: 3, status: "in_progress"},
      {user_id: 6, course_id: 1, status: "in_progress"},
      {user_id: 1, course_id: 2, status: "in_progress"},
      {user_id: 1, course_id: 3, status: "in_progress"},
    ])
    CourseMember.create!([
      {user_id: 11, course_id: 1, status: "in_progress"},
      {user_id: 12, course_id: 1, status: "in_progress"},
      {user_id: 13, course_id: 1, status: "in_progress"},
      {user_id: 15, course_id: 1, status: "in_progress"},
      {user_id: 16, course_id: 2, status: "in_progress"},
      {user_id: 14, course_id: 3, status: "in_progress"},
    ])

    puts "16. Create user subject"
    course = Course.first
    course.course_subjects.all.each do |course_subject|
      user_course = course.user_courses.find_by user_id: 11
      course_subject.user_subjects.create! user_id: 11,
        user_course_id: user_course.id, subject_id: course_subject.subject.id
      user_course = course.user_courses.find_by user_id: 12
      course_subject.user_subjects.create! user_id: 12,
        user_course_id: user_course.id, subject_id: course_subject.subject.id
      user_course = course.user_courses.find_by user_id: 13
      course_subject.user_subjects.create! user_id: 13,
        user_course_id: user_course.id, subject_id: course_subject.subject.id
    end

    puts "18. Create Profile"
    User.all.each do |user|
      Profile.create!([
        {user: user, language_id: 1, organization_id: 2, program_id: 1,
          staff_code: "#{user.id + 1}"},
      ])
    end

    puts "19. Create Evaluation templates"
    EvaluationTemplate.create!([
      {training_standard_id: 1, name: "Evaluation template 1", creator_id: 1},
      {training_standard_id: 2, name: "Evaluation template 2", creator_id: 1},
      {training_standard_id: 3, name: "Evaluation template 3", creator_id: 1},
      {training_standard_id: 4, name: "Evaluation template 4", creator_id: 1}
    ])

    puts "20. Create Evaluation Standard"
    EvaluationStandard.create!([
      {name: "Standard 1", min_point: 0, max_point: 10, average_point: 4, evaluation_template_id: 1, creator_id: 1},
      {name: "Standard 2", min_point: 1, max_point: 9, average_point: 4, evaluation_template_id: 1, creator_id: 1},
      {name: "Standard 3", min_point: 4, max_point: 10, average_point: 5, evaluation_template_id: 1, creator_id: 1},
      {name: "Standard 4", min_point: 3, max_point: 10, average_point: 4, evaluation_template_id: 1, creator_id: 1},
    ])

    puts "21. Create RoleFunction"
    Role.all.limit(3).each do |role|
      Function.all.each do |function|
        RoleFunction.create! role_id: role.id, function_id: function.id
      end
    end

    puts "22. Create UserRole"
    role = Role.find_by id: 1
    User.all.limit(9).each do |user|
      UserRole.create! user_id: user.id, role_id: 1
      UserRole.create! user_id: user.id, role_id: 5
      user.functions = role.functions
    end

    puts "23. Create Survey"
    10.times do |n|
      Survey.create name: "Survey #{n}", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        organization_id: 2, creator_id: 1
    end

    puts "24. Create Assignment"
    10.times do |n|
      Assignment.create name: "Assignment #{n}", organization_id: 2, creator_id: 1
    end

    puts "25. Create TestRule"
    5.times do |n|
      TestRule.create name: "Test rule #{n}", total_question: 30,
        time_of_test: 20, min_score_for_pass: 25, creator_id: 4,
        organization_id: 2
    end

    puts "26. Create Static Subject"
    subject = Subject.first
    Survey.take(5).each do |survey|
      StaticTask.create targetable: survey, ownerable: subject
    end
    Assignment.take(5).each do |assignment|
      StaticTask.create targetable: assignment, ownerable: subject
    end
    StaticTask.create targetable: TestRule.first, ownerable: subject

    puts "27. Create Static CourseSubject"
    course_subject = CourseSubject.first
    Assignment.take(5).each do |assignment|
      StaticTask.create targetable: assignment, ownerable: course_subject
    end
    StaticTask.create targetable: TestRule.first, ownerable: course_subject

    puts "28. Create Dynamic Task"
    course_subject = CourseSubject.first
    course_subject.static_tasks.each do |static_tasks|
      DynamicTask.create targetable: static_tasks, ownerable: course_subject,
        user_id: 11, status: "init"
      DynamicTask.create targetable: static_tasks, ownerable: course_subject,
          user_id: 12, status: "init"
      DynamicTask.create targetable: static_tasks, ownerable: course_subject,
        user_id: 13, status: "init"
    end

    puts "29. Create Team"
    course_subject = CourseSubject.first
    team = course_subject.teams.create! name: "Team Super", creator_id: 1
    user_subject_ids = []
    course_subject.user_subjects.take(3).each do |user_subject|
      user_subject_ids << user_subject.id
    end
    team.user_subject_ids = user_subject_ids

    puts "30. Create Exams"
    course_subject = CourseSubject.first
    TestRule.all.each.with_index 1 do |test_rule, index|
      test_rule.exams.create duration: 20,
        course_subject_id: course_subject.id,
        user_id: course_subject.user_subjects.first.user.id
    end

    puts "31. Create Project"
    Project.create!([
      {name: "Project1", organization_id: 1, creator_id: 1, course_subject_id: 1},
      {name: "Project2", organization_id: 1, creator_id: 2, course_subject_id: 1},
      {name: "Project3", organization_id: 2, creator_id: 3, course_subject_id: 1}])

    puts "32. Create Moving History"
    5.times do |n|
      user = User.find_by id: n + 11
      MovingHistory.create user_id: user.id, organization_id: Organization.second.id,
        sourceable: user.courses.first, destinationable: Course.second, move_date: "06/09/2017"
    end

    puts "33. Create Category"
    ["Ruby", "PHP", "Android", "Java", "iOS"].each do |name|
      Category.create! name: name, description: "Master your Ruby skills and increase your Rails street cred by learning to build dynamic, sustainable applications for the web.",
        creator_id: 1
    end

    puts "34. Create Questions"
    Category.all.each do |category|
      30.times do |n|
        question = category.questions.create! content: "Lorem ipsum is simply dummy text",
          level: n % 3, question_type: 0
        4.times do
          question.answers.create! content: "Lorem ipsum is simply dummy text"
        end
        question.answers.sample.update_attributes is_correct: true
      end
    end

    puts "35. Create Test Rule Condition"
    test_rule = TestRule.first
    Category.take(3).each do |category|
      test_rule.test_rule_categories.create! category_id: category.id,
        number_question: 10, easy: 50, normal: 30, hard: 20
    end

    puts "36. Create Training Results"
    EvaluationTemplate.all.each do |evaluation_template|
      evaluation_template.training_results.create! [
        {name: "Failed", min_point: 0, max_point: 10},
        {name: "Good", min_point: 11, max_point: 20},
        {name: "Excellent", min_point: 21, max_point: 30}
      ]
    end
  end
end
