# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170427020648) do

  create_table "answers", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "question_id"
    t.string   "content"
    t.boolean  "is_correct",  default: false
    t.datetime "deleted_at"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  create_table "assignments", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.text     "name",            limit: 65535
    t.text     "content",         limit: 65535
    t.integer  "organization_id"
    t.integer  "creator_id"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.index ["creator_id"], name: "index_assignments_on_creator_id", using: :btree
    t.index ["organization_id"], name: "index_assignments_on_organization_id", using: :btree
  end

  create_table "categories", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.string   "description"
    t.integer  "creator_id"
    t.datetime "deleted_at"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "certificates", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "course_id"
    t.integer  "program_id"
    t.integer  "training_standard_id"
    t.integer  "user_id"
    t.integer  "total_point"
    t.integer  "training_result_id"
    t.integer  "creator_id"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  create_table "ckeditor_assets", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "data_file_name",               null: false
    t.string   "data_content_type"
    t.integer  "data_file_size"
    t.string   "type",              limit: 30
    t.integer  "width"
    t.integer  "height"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.index ["type"], name: "index_ckeditor_assets_on_type", using: :btree
  end

  create_table "course_subjects", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "subject_id"
    t.string   "subject_name"
    t.string   "subject_description"
    t.text     "subject_content",     limit: 65535
    t.string   "subject_image"
    t.integer  "course_id"
    t.string   "github_link"
    t.string   "heroku_link"
    t.string   "redmine_link"
    t.datetime "deleted_at"
    t.integer  "status",                            default: 0, null: false
    t.datetime "created_at",                                    null: false
    t.datetime "updated_at",                                    null: false
  end

  create_table "courses", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.string   "image"
    t.string   "description"
    t.integer  "status",               default: 0, null: false
    t.integer  "language_id"
    t.date     "start_date"
    t.date     "end_date"
    t.integer  "creator_id"
    t.integer  "program_id"
    t.integer  "training_standard_id"
    t.datetime "deleted_at"
    t.integer  "owner_id"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.index ["creator_id"], name: "index_courses_on_creator_id", using: :btree
  end

  create_table "documents", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "documentable_type"
    t.integer  "documentable_id"
    t.string   "file"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.index ["documentable_type", "documentable_id"], name: "index_documents_on_documentable_type_and_documentable_id", using: :btree
  end

  create_table "evaluation_standards", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.integer  "max_point",              default: 0
    t.integer  "min_point",              default: 0
    t.integer  "average_point",          default: 0
    t.integer  "evaluation_template_id"
    t.datetime "deleted_at"
    t.integer  "creator_id"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.index ["creator_id"], name: "index_evaluation_standards_on_creator_id", using: :btree
  end

  create_table "evaluation_templates", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.integer  "training_standard_id"
    t.datetime "deleted_at"
    t.integer  "creator_id"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
    t.index ["creator_id"], name: "index_evaluation_templates_on_creator_id", using: :btree
  end

  create_table "exams", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "status"
    t.integer  "spent_time"
    t.datetime "started_at"
    t.integer  "score"
    t.integer  "duration"
    t.integer  "course_subject_id"
    t.integer  "course_id"
    t.integer  "user_id"
    t.integer  "test_rule_id"
    t.datetime "deleted_at"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  create_table "functions", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "humanize_name"
    t.string   "controller_name"
    t.string   "action"
    t.integer  "parent_id"
    t.integer  "row_order"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "languages", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.string   "description"
    t.string   "image"
    t.datetime "deleted_at"
    t.integer  "creator_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["creator_id"], name: "index_languages_on_creator_id", using: :btree
  end

  create_table "member_evaluation_items", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "evaluation_point"
    t.integer  "member_evaluation_id"
    t.integer  "evaluation_standard_id"
    t.datetime "deleted_at"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "member_evaluations", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "manager_id"
    t.integer  "member_id"
    t.float    "total_point",            limit: 24
    t.integer  "targetable_id"
    t.string   "targetable_type"
    t.integer  "evaluation_template_id"
    t.datetime "deleted_at"
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
  end

  create_table "meta_tasks", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "title"
    t.text     "value",           limit: 65535
    t.string   "input_type"
    t.integer  "dynamic_task_id"
    t.datetime "deleted_at"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
  end

  create_table "meta_type_relationships", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "meta_type_id"
    t.integer  "objectable_id"
    t.string   "objectable_type"
    t.datetime "deleted_at"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "meta_types", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.integer  "organization_id"
    t.datetime "deleted_at"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "moving_histories", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "user_id"
    t.integer  "organization_id"
    t.integer  "sourceable_id"
    t.string   "sourceable_type"
    t.integer  "destinationable_id"
    t.string   "destinationable_type"
    t.date     "move_date"
    t.datetime "deleted_at"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  create_table "organization_hierarchies", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "ancestor_id",   null: false
    t.integer "descendant_id", null: false
    t.integer "generations",   null: false
  end

  create_table "organizations", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.integer  "parent_id"
    t.integer  "user_id"
    t.datetime "deleted_at"
    t.integer  "creator_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creator_id"], name: "index_organizations_on_creator_id", using: :btree
  end

  create_table "profiles", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "user_id"
    t.date     "start_training_date"
    t.date     "leave_date"
    t.date     "finish_training_date"
    t.date     "ready_for_project"
    t.date     "contract_date"
    t.string   "naitei_company"
    t.integer  "university_id"
    t.date     "graduation"
    t.integer  "language_id"
    t.integer  "trainee_type_id"
    t.integer  "user_status_id"
    t.integer  "stage_id"
    t.integer  "organization_id"
    t.float    "working_day",          limit: 24
    t.integer  "program_id"
    t.string   "staff_code"
    t.integer  "division"
    t.date     "join_div_date"
    t.datetime "deleted_at"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
  end

  create_table "program_hierarchies", id: false, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "ancestor_id",   null: false
    t.integer "descendant_id", null: false
    t.integer "generations",   null: false
    t.index ["ancestor_id", "descendant_id", "generations"], name: "program_anc_desc_idx", unique: true, using: :btree
    t.index ["descendant_id"], name: "program_desc_idx", using: :btree
  end

  create_table "programs", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.integer  "program_type"
    t.integer  "parent_id"
    t.integer  "organization_id"
    t.datetime "deleted_at"
    t.integer  "creator_id"
    t.integer  "owner_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["creator_id"], name: "index_programs_on_creator_id", using: :btree
    t.index ["owner_id"], name: "index_programs_on_owner_id", using: :btree
  end

  create_table "projects", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.string   "description"
    t.integer  "organization_id"
    t.integer  "course_subject_id"
    t.integer  "task_id"
    t.integer  "creator_id"
    t.datetime "deleted_at"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.index ["course_subject_id"], name: "index_projects_on_course_subject_id", using: :btree
    t.index ["creator_id"], name: "index_projects_on_creator_id", using: :btree
    t.index ["organization_id"], name: "index_projects_on_organization_id", using: :btree
    t.index ["task_id"], name: "index_projects_on_task_id", using: :btree
  end

  create_table "questions", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "category_id"
    t.string   "content"
    t.integer  "level"
    t.integer  "question_type"
    t.datetime "deleted_at"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "requirements", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.text     "name",       limit: 65535
    t.integer  "priority"
    t.integer  "project_id"
    t.integer  "creator_id"
    t.datetime "deleted_at"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.index ["creator_id"], name: "index_requirements_on_creator_id", using: :btree
    t.index ["project_id"], name: "index_requirements_on_project_id", using: :btree
  end

  create_table "results", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "exam_id"
    t.integer  "question_id"
    t.integer  "answer_id"
    t.datetime "deleted_at"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "role_functions", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "role_id"
    t.integer  "function_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "roles", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.integer  "parent_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "share_withs", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "organization_id"
    t.integer  "training_standard_id"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  create_table "stages", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.datetime "deleted_at"
    t.integer  "creator_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creator_id"], name: "index_stages_on_creator_id", using: :btree
  end

  create_table "standard_subjects", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "subject_id"
    t.integer  "training_standard_id"
    t.datetime "deleted_at"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  create_table "subjects", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.string   "image"
    t.string   "description"
    t.text     "content",         limit: 65535
    t.datetime "deleted_at"
    t.integer  "during_time"
    t.integer  "organization_id"
    t.integer  "creator_id"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.index ["creator_id"], name: "index_subjects_on_creator_id", using: :btree
    t.index ["organization_id"], name: "index_subjects_on_organization_id", using: :btree
  end

  create_table "surveys", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.text     "name",            limit: 65535
    t.text     "content",         limit: 65535
    t.integer  "organization_id"
    t.integer  "creator_id"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.index ["creator_id"], name: "index_surveys_on_creator_id", using: :btree
    t.index ["organization_id"], name: "index_surveys_on_organization_id", using: :btree
  end

  create_table "tasks", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "targetable_id"
    t.string   "targetable_type"
    t.integer  "ownerable_id"
    t.string   "ownerable_type"
    t.integer  "user_id"
    t.integer  "status"
    t.string   "type"
    t.datetime "deleted_at"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "teams", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.integer  "course_subject_id"
    t.datetime "deleted_at"
    t.integer  "creator_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.index ["creator_id"], name: "index_teams_on_creator_id", using: :btree
  end

  create_table "test_rule_categories", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "test_rule_id"
    t.integer  "category_id"
    t.integer  "number_question"
    t.integer  "easy"
    t.integer  "normal"
    t.integer  "hard"
    t.datetime "deleted_at"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["category_id"], name: "index_test_rule_categories_on_category_id", using: :btree
    t.index ["test_rule_id"], name: "index_test_rule_categories_on_test_rule_id", using: :btree
  end

  create_table "test_rule_questions", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "test_rule_id"
    t.integer  "question_id"
    t.datetime "deleted_at"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["question_id"], name: "index_test_rule_questions_on_question_id", using: :btree
    t.index ["test_rule_id"], name: "index_test_rule_questions_on_test_rule_id", using: :btree
  end

  create_table "test_rules", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.integer  "total_question"
    t.integer  "time_of_test"
    t.integer  "min_score_for_pass"
    t.integer  "opportunity"
    t.integer  "number_of_test"
    t.integer  "creator_id"
    t.integer  "organization_id"
    t.datetime "deleted_at"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.index ["creator_id"], name: "index_test_rules_on_creator_id", using: :btree
    t.index ["organization_id"], name: "index_test_rules_on_organization_id", using: :btree
  end

  create_table "trainee_types", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "training_results", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.integer  "min_point"
    t.integer  "max_point"
    t.integer  "evaluation_template_id"
    t.datetime "deleted_at"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.index ["evaluation_template_id"], name: "index_training_results_on_evaluation_template_id", using: :btree
  end

  create_table "training_standards", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.integer  "creator_id"
    t.text     "description",     limit: 65535
    t.datetime "deleted_at"
    t.integer  "policy",                        default: 0
    t.integer  "organization_id"
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
    t.index ["creator_id"], name: "index_training_standards_on_creator_id", using: :btree
    t.index ["organization_id"], name: "index_training_standards_on_organization_id", using: :btree
  end

  create_table "universities", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.datetime "deleted_at"
    t.integer  "creator_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creator_id"], name: "index_universities_on_creator_id", using: :btree
  end

  create_table "user_courses", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "type"
    t.integer  "user_id"
    t.integer  "course_id"
    t.integer  "status",     default: 0, null: false
    t.datetime "deleted_at"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "user_functions", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "user_id"
    t.integer  "function_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "user_programs", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "program_id"
    t.integer  "user_id"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_roles", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "user_id"
    t.integer  "role_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_statuses", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_subjects", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "user_id"
    t.integer  "status",            default: 0, null: false
    t.integer  "user_course_id"
    t.integer  "course_subject_id"
    t.boolean  "current_progress"
    t.date     "user_end_date"
    t.date     "start_date"
    t.date     "end_date"
    t.integer  "subject_id"
    t.integer  "team_id"
    t.datetime "deleted_at"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "email",                             default: "", null: false
    t.string   "encrypted_password",                default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                     default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "authentication_token",   limit: 30
    t.string   "name"
    t.string   "avatar"
    t.integer  "trainer_id"
    t.string   "type"
    t.datetime "deleted_at"
    t.datetime "created_at",                                     null: false
    t.datetime "updated_at",                                     null: false
    t.index ["authentication_token"], name: "index_users_on_authentication_token", unique: true, using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

end
