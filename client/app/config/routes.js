import * as app_constants from 'constants/app_constants';

const APP_URL = app_constants.APP_NAME;

//assignment
export function dynamic_tasks_url() {
  return APP_URL + app_constants.DYNAMICTASKS_PATH;
}

export function dynamic_task_url(id) {
  return dynamic_tasks_url() + '/' + id;
}

export function dynamic_task_meta_tasks_url(dynamic_task_id) {
  return dynamic_task_url(dynamic_task_id) + '/' + app_constants.META_TASKS_PATH;
}

export function assignments_url() {
  return APP_URL + app_constants.ASSIGNMENTS_PATH;
}

//category
export function categories_url() {
  return APP_URL + app_constants.CATEGORIES_PATH;
}

export function category_url(id) {
  return categories_url() + '/' + id;
}

//question
export function questions_url(category_id) {
  return category_url(category_id) + '/' + app_constants.QUESTIONS_PATH;
}

//task
export function assign_tasks_url() {
  return APP_URL + app_constants.ASSIGN_TASKS_PATH;
}

export function assign_task_url(id) {
  return assign_tasks_url() + '/' + id;
}

//assign user
export function assign_user_courses_url(course_id) {
  return APP_URL + app_constants.ASSIGN_USER_COURSES_PATH + '/' + course_id;
}

//course
export function courses_url() {
  return APP_URL + app_constants.COURSES_PATH;
}

export function course_url(id) {
  return courses_url() + '/' + id;
}

//member evaluation
export function member_evaluation_url(course_id, evaluation_id) {
  return course_url(course_id) + '/' + app_constants.MEMBER_EVALUATIONS_PATH +
    '/' + evaluation_id;
}

//move user
export function move_users_url() {
  return APP_URL + app_constants.MOVE_USERS_PATH;
}

//move course
export function move_course_url(course_id) {
  return APP_URL + app_constants.MOVE_COURSES_PATH + '/' + course_id;
}

//subject
export function subjects_url() {
  return APP_URL + app_constants.SUBJECTS_PATH;
}

export function subject_url(id) {
  return subjects_url() + '/' + id;
}

export function course_subject_url(course_id, subject_id) {
  return course_url(course_id) + '/' + app_constants.SUBJECTS_PATH + '/' +
    subject_id;
}

export function create_meta_task_url(dynamic_task_id) {
  return dynamic_task_url(dynamic_task_id) + '/' + app_constants.META_TASKS_PATH
}

export function update_meta_task_url(dynamic_task_id) {
  return dynamic_task_url(dynamic_task_id) + '/'
    + app_constants.UPDATE_META_TASK_PATH
}

//organization
export function organizations_url() {
  return APP_URL + app_constants.ORGANIZATIONS_PATH;
}

export function organization_url(id) {
  return organizations_url() + '/' + id; 'organization'
}

//program
export function programs_url() {
  return APP_URL + app_constants.PROGRAMS_PATH;
}

export function program_url(id) {
  return programs_url() + '/' + id;
}

//organization program
export function organization_programs_url(organization_id) {
  return organizations_url() + '/' + organization_id + '/' +
    app_constants.PROGRAMS_PATH;
}

export function organization_program_url(organization_id, program_id) {
  return organization_programs_url(organization_id) + '/' + program_id;
}

//program course
export function prorgam_courses_url(program_id) {
  return program_url(program_id) + '/' + app_constants.COURSES_PATH;
}

export function program_course_url(program_id, course_id) {
  return prorgam_courses_url(program_id) + '/' + course_id;
}

//user
export function users_url() {
  return APP_URL + app_constants.USERS_PATH;
}

export function user_url(id) {
  return users_url() + '/' + id;
}

//document
export function documents_url() {
  return APP_URL + app_constants.DOCUMENTS_PATH;
}

export function document_url(id) {
  return documents_url() + '/' + id;
}

//logout
export function logout_url() {
  return APP_URL + app_constants.LOGOUT_PATH;
}

//language
export function languages_url() {
  return APP_URL + app_constants.LANGUAGES_PATH;
}

export function language_url(id) {
  return languages_url() + '/' + id;
}

//stage
export function stages_url() {
  return APP_URL + app_constants.STAGES_PATH;
}

export function stage_url(id) {
  return stages_url() + '/' + id;
}

//trainee types
export function trainee_types_url() {
  return APP_URL + app_constants.TRAINEE_TYPES_PATH;
}

export function trainee_type_url(id) {
  return trainee_types_url() + '/' + id;
}

//training standard
export function training_standards_url() {
  return APP_URL + app_constants.TRAINING_STANDARDS_PATH;
}

export function training_standard_url(id) {
  return training_standards_url() + '/' + id;
}

//university
export function universities_url() {
  return APP_URL + app_constants.UNIVERSITIES_PATH;
}

export function university_url(id) {
  return universities_url() + '/' + id;
}

//function
export function functions_url() {
  return APP_URL + app_constants.FUNCTIONS_PATH;
}

//role
export function roles_url() {
  return APP_URL + app_constants.ROLES_PATH;
}

export function role_url(id) {
  return roles_url() + '/' + id;
}

//myspace course
export function my_space_course_url() {
  return APP_URL + app_constants.MY_SPACE_COURSES_PATH;
}

//myspace exams
export function my_space_exams_url() {
  return APP_URL + app_constants.MY_SPACE_EXAMS_PATH;
}

//project
export function projects_url() {
  return APP_URL + app_constants.PROJECTS_PATH;
}

export function project_url(id) {
  return projects_url() + '/' + id;
}

//test rule
export function organization_test_rules_url(organization_id) {
  return organization_url(organization_id) + '/' +
    app_constants.TEST_RULES_PATH;
}

export function test_rules_url() {
  return APP_URL + app_constants.TEST_RULES_PATH;
}

export function test_rule_url(id) {
  return test_rules_url() + '/' + id;
}

//statistic language
export function statistics_languages_url() {
  return APP_URL + app_constants.STATISTICS_PATH + '/' +
    app_constants.LANGUAGES_PATH
}

//statistic trainee type
export function statistics_trainee_types_url() {
  return APP_URL + app_constants.STATISTICS_PATH + '/' +
    app_constants.TRAINEE_TYPES_PATH;
}

//statistic in out
export function statistics_in_out_url() {
  return APP_URL + app_constants.STATISTICS_PATH + '/' +
    app_constants.IN_OUTS_STATISTICS_PATH;
}

//evaluation template standard
export function evaluation_template_standard_url(template_id, standard_id) {
  return APP_URL + app_constants.EVALUATION_TEMPLATES_PATH + '/' + template_id +
    '/' + app_constants.EVALUATION_STANDARDS_PATH + '/' + standard_id;
}

//evaluatioon template stantdards
export function evaluation_template_standards_url(template_id) {
  return APP_URL + app_constants.EVALUATION_TEMPLATES_PATH + '/' + template_id +
    '/' + app_constants.EVALUATION_STANDARDS_PATH;
}

//evaluation standard template
export function evaluation_standard_template_url(standard_id) {
  return APP_URL + app_constants.EVALUATION_STANDARDS_PATH + '/' + standard_id +
    '/' + app_constants.EVALUATION_TEMPLATE_PATH;
}

//organization exam
export function organization_exams_url(organization_id) {
  return organization_url(organization_id) + '/' + app_constants.EXAMS_PATH;
}

export function organization_exam_url(organization_id, exam_id) {
  return organization_exams_url(organization_id) + '/' + exam_id;
}

//exam
export function exams_url() {
  return APP_URL + app_constants.EXAMS_PATH;
}

export function exam_url(id) {
  return exams_url() + '/' + id;
}

//filter role
export function filter_role_url(id) {
  return APP_URL + app_constants.FILTER_ROLE_PATH + id;
}

//sub organization
export function sub_organization_url(id) {
  return APP_URL + app_constants.SUB_ORGANIZATIONS_PATH + '/' + id;
}

//organization members
export function organization_members_url(organization_id) {
  return organization_url(organization_id) + '/' + app_constants.USERS_PATH;
}

//organization subjects
export function organization_subjects_url(organization_id) {
  return organization_url(organization_id) + '/' + app_constants.SUBJECTS_PATH;
}

export function organization_subject_url(organization_id, subject_id) {
  return organization_url(organization_id) + '/' +
    app_constants.SUBJECTS_PATH + '/' + subject_id;
}

//ogranization training standards
export function organization_training_standards_url(organization_id) {
  return organization_url(organization_id) + '/' +
    app_constants.TRAINING_STANDARDS_PATH;
}

export function organization_training_standard_url(organization_id, standard_id) {
  return organization_training_standards_url(organization_id) + '/' + standard_id;
}

//organization statistics
export function organization_statistics_url(organization_id) {
  return organization_url(organization_id) + '/' + app_constants.STATISTICS_PATH;
}

export function organization_statistics_in_outs_url(organization_id) {
  return organization_statistics_url(organization_id) + '/' +
    app_constants.IN_OUTS_STATISTICS_PATH;
}

//program new user
export function new_program_user_url(program_id) {
  return program_url(program_id) + '/' + app_constants.USERS_NEW_PATH;
}

//assign program
export function assign_programs_url() {
  return APP_URL + app_constants.ASSIGN_PROGRAM_PATH;
}

export function assign_program_url(organization_id) {
  return assign_programs_url() + '/' + organization_id;
}

// assign standard
export function assign_standards_url() {
  return APP_URL + app_constants.ASSIGN_STANDARD_PATH;
}

//subject project
export function subject_projects_url(subject_id) {
  return subject_url(subject_id) + '/' + app_constants.PROJECTS_PATH;
}

export function subject_project_url(subject_id, project_id) {
  return subject_projects_url(subject_id) + '/' + project_id;
}

//project requirement
export function project_requirements_url(project_id) {
  return project_url(project_id) + '/' + app_constants.REQUIREMENTS_PATH;
}

export function project_requirement_url(project_id, requirement_id) {
  return project_requirements_url(project_id) + '/' + requirement_id
}

//role function
export function role_functions_url(role_id) {
  return APP_URL + app_constants.ROLE_FUNCTIONS_PATH + '/' + role_id;
}

export function static_pages_url() {
  return APP_URL + app_constants.STATIC_PAGE_PATH;
}

// organization statistics language
export function organization_statistics_languages_url(organization_id) {
  return organization_statistics_url(organization_id) + '/' +
    app_constants.LANGUAGES_PATH;
}

// organization statistics trainee types
export function organization_statistics_trainee_types_url(organization_id) {
  return organization_statistics_url(organization_id) + '/' +
    app_constants.TRAINEE_TYPES_PATH;
}

//subject task
export function subject_tasks_url() {
  return APP_URL + app_constants.SUBJECT_TASKS_PATH;
}

//team
export function teams_url() {
  return APP_URL + app_constants.TEAMS_PATH;
}

export function team_url(id) {
  return teams_url() + '/' + id;
}

//user subject
export function user_subject_url(id) {
  return APP_URL + app_constants.USER_SUBJECTS_PATH + '/' + id;
}

export function change_status_user_subject_url() {
  return APP_URL + app_constants.CHANGE_STATUS_USER_SUBJECT_PATH;
}

//clone
export function clone_url() {
  return APP_URL + app_constants.CLONE_PATH;
}

//share with
export function share_with_url() {
  return APP_URL + app_constants.SHARE_WITH_PATH;
}

//training standard evaluation template
export function training_standard_evaluation_template_url(standard_id) {
  return training_standard_url(standard_id) + '/' +
    app_constants.EVALUATION_TEMPLATE_PATH;
}

//standard subject
export function standard_subjects_url() {
  return APP_URL + app_constants.STANDARD_SUBECTS_PATH;
}

// user course
export function user_course_subject_url(user_course_id, subject_id) {
  return APP_URL + app_constants.USER_COURSES_PATH + '/' + user_course_id + '/' +
    app_constants.SUBJECTS_PATH + '/' + subject_id;
}

//change role
export function change_role_user_url(user_id) {
  return APP_URL + app_constants.CHANGE_ROLE_PATH + '/' +
    app_constants.USERS_PATH + '/' + user_id;
}

//organization user
export function organization_users_url(organization_id) {
  return organization_url(organization_id) + '/' + app_constants.USERS_PATH;
}

export function organization_user_url(organization_id, user_id) {
  return organization_users_url(organization_id) + '/' + user_id;
}

export function new_organization_user_url(organization_id) {
  return organization_users_url(organization_id) + '/' + app_constants.NEW_PATH;
}

//change profile
export function change_profile_users_url() {
  return APP_URL + app_constants.CHANGE_PROFILE + '/' + app_constants.USERS_PATH;
}

export function change_profile_user_url(user_id) {
  return change_profile_users_url() + '/' + user_id;
}

//edit user
export function edit_user_url(id) {
  return user_url(id) + '/' + app_constants.EDIT_PATH;
}

//user function
export function user_function_url(id) {
  return APP_URL + app_constants.USER_FUNCTIONS_PATH + '/' + id;
}

//meta_type
export function meta_types_url() {
  return APP_URL + app_constants.META_TYPES_PATH;
}

// task
export function tasks_url() {
  return APP_URL + app_constants.TASKS_PATH;
}

export function task_url(id) {
  return tasks_url() + '/' + id;
}

//user profile
export function user_profile_url(id) {
  return APP_URL + app_constants.USER_PROFILES_PATH + '/' + id;
}

export function certificate_url(user_id, certificate_id) {
  return APP_URL + app_constants.USERS_PATH + '/' + user_id + '/'
    + app_constants.CERTIFICATES_PATH + '/' + certificate_id;
}
