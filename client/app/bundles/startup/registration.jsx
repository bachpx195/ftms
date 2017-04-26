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
import OrganizationBox from '../components/organizations/box';
import Policies from '../policies/policies';
import ProgramsBox from '../components/programs/box';
import ProjectBox from '../components/projects/show';
import ProjectsBox from '../components/projects/box';
import RoleBox from '../components/roles/roles_box';
import ShowOrganizationBox from '../components/organizations/show';
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
import TaskBox from '../components/tasks/show';
import TeamsShowBox from '../components/teams/show';
import TestRulesBox from '../components/test_rules/box';
import TimeLineBox from '../components/timelines/show';
import TraineeTypeBox from '../components/trainee_types/trainee_types_box';
import TrainingStandardBox from '../components/training_standards/box';
import TrainingStandardShow from '../components/training_standards/show';
import UniversityBox from '../components/universities/box';
import UserCoursesBox from '../components/user_courses/user_courses_box';
import UsersBox from '../components/users/box';
import UserFormsBox from '../components/users/forms_box';
import UserShowBox from '../components/users/show';
import SubjectManagerShowBox from '../components/subjects/managers/show';
import SubjectTraineeShowBox from '../components/subjects/members/show';

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
  TaskBox,
  TeamsShowBox,
  TestRulesBox,
  TimeLineBox,
  TraineeTypeBox,
  TrainingStandardBox,
  TrainingStandardShow,
  UniversityBox,
  UserCoursesBox,
  UserFormsBox,
  UsersBox,
  UserShowBox,
  SubjectManagerShowBox,
  SubjectTraineeShowBox,
});
