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
import LanguageBox from '../components/languages/box';
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
import StatisticsLanguageBox from "../components/statistics/languages/languages";
import StatisticsInOutBox from "../components/statistics/in_outs/in_outs";
import StatisticsTraineeTypeBox from "../components/statistics/trainee_types/trainee_types";
import SubOrganizationShowBox from '../components/sub_organizations/show_box';
import SubjectBox from '../components/subjects/box';
import SubjectsShowBox from  '../components/subjects/show';
import ProgramsShowBox from '../components/programs/show';
import TeamsShowBox from '../components/teams/teams_show_box';
import TestRulesBox from '../components/test_rules/box';
import TraineeTypeBox from '../components/trainee_types/trainee_types_box';
import TrainingStandardBox from '../components/training_standards/box';
import TrainingStandardShow from '../components/training_standards/templates/standard_show';
import UniversityBox from '../components/universities/box';
import UserCoursesBox from '../components/user_courses/user_courses_box';
import UsersBox from '../components/users/box';
import ManageBox from '../components/users/manage_box';
import UserShowBox from '../components/users/show';

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
  StatisticsInOutBox,
  StatisticsLanguageBox,
  StatisticsTraineeTypeBox,
  SubOrganizationShowBox,
  SubjectBox,
  SubjectsShowBox,
  TeamsShowBox,
  TestRulesBox,
  TraineeTypeBox,
  TrainingStandardBox,
  TrainingStandardShow,
  UniversityBox,
  UserCoursesBox,
  ManageBox,
  UsersBox,
  UserShowBox,
});
