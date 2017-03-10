import ReactOnRails from 'react-on-rails';

//admin
import Header from '../components/dashboards/header';
import Sidebar from '../components/dashboards/sidebar';
import Footer from '../components/dashboards/footer';
import UniversityBox from '../components/universities/universities_box';
import LanguageBox from '../components/languages/languages_box';
import SubjectBox from '../components/subjects/subjects_box';
import TraineeTypeBox from '../components/trainee_types/trainee_types_box';
import TrainingStandardBox from '../components/training_standards/training_standards_box';
import StageBox from '../components/stages/stages_box';
import ShowOrganizationBox from '../components/show_organizations/organizations_box';
import OrganizationBox from '../components/organizations/organizations_box';
import StaticPageBox from '../components/static_pages/static_pages_box';
import ProgramsBox from '../components/programs/programs_box';
import ProgramsShowBox from '../components/programs/programs_show_box';
import SubjectsShowBox from  '../components/subjects/subjects_show_box';
import StandardShow from '../components/training_standards/standard_show';
import FunctionsBox from '../components/functions/functions_box';
import RoleBox from '../components/roles/roles_box';
import UserShowBox from '../components/users/user_show_box';
import SupervisorProgramsShowBox from '../components/programs/supervisor_programs_show_box';
import ProfileShowBox from '../components/users/profile_show_box';
import SupervisorTrainingStandardBox from '../components/supervisor_training_standards/supervisor_training_standard_box';
import CoursesShowBox from '../components/courses/courses_show_box';

//supervisor
import SubOrganizationShowBox from '../components/sub_organizations/show_box';
import EvaluationTemplatesBox from '../components/evaluation_templates/evaluation_templates_box';
// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
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
  StandardShow,
  FunctionsBox,
  RoleBox,
  UserShowBox,
  SupervisorProgramsShowBox,
  SubOrganizationShowBox,
  EvaluationTemplatesBox,
  ProfileShowBox,
  SupervisorTrainingStandardBox,
  CoursesShowBox
});
