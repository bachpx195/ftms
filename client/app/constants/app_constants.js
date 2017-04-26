export const APP_NAME = 'http://localhost:3000/';
export const AXIOS_CONFIG = {headers: {'Accept': 'application/json'}};
export const ROOT_PATH = '';
export const DEFAULT_IMAGE_COURSE_URL = '/assets/edu.jpg';
export const DEFAULT_IMAGE_SUBJECT_URL = '/assets/subject.jpeg';
export const DEFAULT_IMAGE_USER_URL = '/assets/profile.png';
export const LIMIT_DESCRIPTION = 36;
export const ACCEPT_DOCUMENT_TYPES = 'application/pdf,.doc,.docx';
export const MAX_DOCUMENT_SIZE = 15;

//Organization
export const ORGANIZATIONS_PATH = 'organizations';
export const PROGRAMS_PATH = 'programs';

//Program
export const ASSIGN_STANDARD_PATH = 'assign_program/standards';
export const ASSIGN_PROGRAM_PATH = 'assign_program/organizations';
export const LIMIT_DESCRIPTION_PROGRAM = 36;
export const USERS_NEW_PATH = 'users/new';
export const TRAINING_STANDARDS_PATH = 'training_standards';

//User
export const USERS_PATH = 'users';
export const NEW_PATH = 'new';
export const EDIT_PATH = 'edit';
export const MOVE_USERS_PATH = 'move/users';

//Course
export const MY_COURSES_PATH = 'courses';
export const COURSES_PATH = 'courses';
export const MOVE_COURSES_PATH = 'move/courses';
export const ASSIGN_USER_COURSES_PATH = 'assign_user/courses';
export const USER_COURSES_PATH = 'user_courses';
export const ASSIGN_TASKS_PATH = 'assign_task/tasks';
export const MEMBER_EVALUATIONS_PATH = 'member_evaluations';
export const LIMIT_COURSE_MEMBERS = 3;
export const LIMIT_DESCRIPTION_COURSE = 120;

//Role
export const ROLES_PATH = 'roles';
export const ROLE_FUNCTIONS_PATH = 'role_functions';
export const FILTER_ROLE_PATH = 'filter_role/roles.json?role_id=';
export const CHANGE_ROLE_PATH = 'change_role'

//Subject
export const SUBJECTS_PATH = 'subjects';
export const USER_SUBJECTS_PATH = 'user_subjects';
export const SUBJECT_TASKS_PATH = 'create_task/tasks';
export const COURSE_SUBJECTS_PATH = 'course_subjects';
export const TEAMS_PATH = 'teams';
export const ASSIGNMENTS_PATH = 'assignments';
export const DYNAMICTASKS_PATH = 'dynamic_tasks';
export const OWNERABLE_COURSE_SUBJECT = 'CourseSubject';
export const EXAMS_PATH = 'exams';
export const META_TASKS_PATH = 'meta_tasks';
export const META_TYPES_PATH = 'meta_types';
export const UPDATE_META_TASK_PATH = 'update_meta_task';

//dashboard
export const LOGOUT_PATH = 'auth/logout';
export const LANGUAGES_PATH = 'languages';
export const STAGES_PATH = 'stages';
export const TRAINEE_TYPES_PATH = 'trainee_types';
export const UNIVERSITIES_PATH = 'universities';
export const FUNCTIONS_PATH = 'functions';
export const MY_SPACE_COURSES_PATH = 'my_space/courses';
export const MOVING_HISTORIES_PATH = 'moving_histories';
export const PROJECTS_PATH = 'projects';
export const TEST_RULES_PATH = 'test_rules';
export const MY_SPACE_EXAMS_PATH = 'my_space/exams';
export const IN_OUTS_STATISTICS_PATH = 'in_outs';
export const STATISTICS_PATH = 'statistics';

//evaluation template
export const EVALUATION_TEMPLATE_PATH = 'evaluation_template';
export const EVALUATION_TEMPLATES_PATH = 'evaluation_templates';
export const EVALUATION_STANDARDS_PATH = 'evaluation_standards';

//categories
export const CATEGORIES_PATH = 'categories';
export const QUESTIONS_PATH = 'questions';
export const REQUIREMENTS_PATH = 'requirements';
export const STATIC_PAGE_PATH = 'static_pages';
export const SUB_ORGANIZATIONS_PATH = 'sub_organizations';
export const DOCUMENTS_PATH = 'documents';
export const CHANGE_PROFILE = 'change_profile';

//training standard
export const STANDARD_SUBECTS_PATH = 'standard_subjects';
export const POLICIES = [{id: 'publiced', name: 'Publiced'},
  {id: 'privated', name: 'Privated'}]
export const SHARE_WITH_PATH = 'share_withs'
export const CLONE_PATH = 'clone/training_standards';

//user_course
export const LIMIT_DESCRIPTION_USER_COURSE = 120;
export const SUBJECT_ = 120;

// task
export const TASKS_PATH = 'tasks';

export function isOverMaxDocumentSize(file) {
  let is_over = (file.size/1048576) >= MAX_DOCUMENT_SIZE;
  if (is_over) {
    alert(I18n.t("documents.alert.max_file_size"));
  }
  return is_over;
}

//profile
export const USER_PROFILES_PATH = 'profiles';

//certificate
export const CERTIFICATES_PATH = 'certificates';
