import ReactOnRails from 'react-on-rails';

import CategoriesBox from '../components/categories/box';
import CategoryBox from '../components/categories/show';
import CoursesBox from '../components/courses/box';
import CourseBox from '../components/courses/show';
import EvaluationTemplatesBox from '../components/evaluation_templates/evaluation_templates_box';
import ExamBox from '../components/exams/show';
import ExamsBox from '../components/exams/box';
import Footer from '../components/dashboards/footer';
import FunctionsBox from '../components/functions/functions_box';
import Header from '../components/dashboards/header';
import LanguageBox from '../components/languages/languages_box';
import MovingHistoryBox from '../components/moving_histories/moving_histories_box';
import OrganizationBox from '../components/organizations/organizations_box';
import Policies from '../policies/policies';
import ProfileShowBox from '../components/users/profile_show_box';
import ProgramsBox from '../components/programs/box';
import ProjectBox from '../components/projects/show';
import ProjectsBox from '../components/projects/box';
import RoleBox from '../components/roles/roles_box';
import ShowOrganizationBox from '../components/show_organizations/organizations_box';
import Sidebar from '../components/dashboards/sidebar';
import StageBox from '../components/stages/box';
import StaticPageBox from '../components/static_pages/static_pages_box';
import SubOrganizationShowBox from '../components/sub_organizations/show_box';
import SubjectBox from '../components/subjects/subjects_box';
import SubjectsShowBox from  '../components/subjects/subjects_show_box';
import ProgramsShowBox from '../components/programs/show';
import TeamsShowBox from '../components/teams/teams_show_box';
import TestRuleBox from '../components/test_rules/test_rules_box';
import TraineeTypeBox from '../components/trainee_types/trainee_types_box';
import TrainingStandardBox from '../components/training_standards/training_standards_box';
import TrainingStandardShow from '../components/training_standards/admin/standard_show';
import UniversityBox from '../components/universities/box';
import UserCoursesBox from '../components/user_courses/user_courses_box';
import UserIndexBox from '../components/users/user_index_box';
import UserNewBox from '../components/users/user_new_box';
import UserRolesBox from '../components/users/user_roles_box';
import UserShowBox from '../components/users/user_show_box';

ReactOnRails.register({
  CategoriesBox,
  CategoryBox,
  CoursesBox,
  CourseBox,
  EvaluationTemplatesBox,
  ExamBox,
  ExamsBox,
  Footer,
  FunctionsBox,
  Header,
  LanguageBox,
  MovingHistoryBox,
  OrganizationBox,
  Policies,
  ProfileShowBox,
  ProgramsBox,
  ProgramsShowBox,
  ProjectBox,
  ProjectsBox,
  RoleBox,
  ShowOrganizationBox,
  Sidebar,
  StageBox,
  StaticPageBox,
  SubOrganizationShowBox,
  SubjectBox,
  SubjectsShowBox,
  TeamsShowBox,
  TestRuleBox,
  TraineeTypeBox,
  TrainingStandardBox,
  TrainingStandardShow,
  UniversityBox,
  UserCoursesBox,
  UserNewBox,
  UserIndexBox,
  UserRolesBox,
  UserShowBox,
});
