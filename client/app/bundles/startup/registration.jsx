import ReactOnRails from 'react-on-rails';

//admin
import Policies from '../policies/policies';
import Header from '../components/dashboards/header';
import Sidebar from '../components/dashboards/sidebar';
import Footer from '../components/dashboards/footer';
import UniversityBox from '../components/universities/box';
import LanguageBox from '../components/languages/languages_box';
import SubjectBox from '../components/subjects/subjects_box';
import TraineeTypeBox from '../components/trainee_types/trainee_types_box';
import StageBox from '../components/stages/box';
import ShowOrganizationBox from '../components/show_organizations/organizations_box';
import StaticPageBox from '../components/static_pages/static_pages_box';
import ProgramsBox from '../components/programs/programs_box';
import ProgramsShowBox from '../components/programs/programs_show_box';
import SubjectsShowBox from  '../components/subjects/subjects_show_box';
import FunctionsBox from '../components/functions/functions_box';
import RoleBox from '../components/roles/roles_box';
import UserShowBox from '../components/users/user_show_box';
import UserIndexBox from '../components/users/user_index_box';
import SupervisorProgramsShowBox from '../components/programs/supervisor_programs_show_box';
import ProfileShowBox from '../components/users/profile_show_box';
import CoursesShowBox from '../components/courses/courses_show_box';
import UserRolesBox from '../components/users/user_roles_box';
import UserCoursesBox from '../components/user_courses/user_courses_box';
import TeamsShowBox from '../components/teams/teams_show_box';
import MovingHistoryBox from '../components/moving_histories/moving_histories_box';
//supervisor
import SubOrganizationShowBox from '../components/sub_organizations/show_box';
import EvaluationTemplatesBox from '../components/evaluation_templates/evaluation_templates_box';
// This is how react_on_rails can see the HelloWorld in the browser.

import TrainingStandardBox from '../components/training_standards/training_standards_box';
import TrainingStandardShow from '../components/training_standards/admin/standard_show';

//organization
import OrganizationBox from '../components/organizations/organizations_box';

//1. Trainee Course index
import CoursesBox from '../components/courses/courses_box';
import ProjectBox from '../components/projects/projects_box';
import ProjectsShowBox from '../components/projects/projects_show_box';
import CategoryBox from '../components/categories/categories_box';
import TestRuleBox from '../components/test_rules/test_rules_box';

ReactOnRails.register({
  Policies,
  Header,
  Sidebar,
  Footer,
  UniversityBox,
  LanguageBox,
  SubjectBox,
  TraineeTypeBox,
  TrainingStandardBox,
  StageBox,
  OrganizationBox,
  ShowOrganizationBox,
  StaticPageBox,
  ProgramsBox,
  ProgramsShowBox,
  SubjectsShowBox,
  FunctionsBox,
  RoleBox,
  UserShowBox,
  UserIndexBox,
  SupervisorProgramsShowBox,
  SubOrganizationShowBox,
  EvaluationTemplatesBox,
  ProfileShowBox,
  CoursesShowBox,
  CoursesBox,
  TrainingStandardShow,
  UserRolesBox,
  UserCoursesBox,
  TeamsShowBox,
  ProjectBox,
  ProjectsShowBox,
  MovingHistoryBox,
  CategoryBox,
  TestRuleBox
});
