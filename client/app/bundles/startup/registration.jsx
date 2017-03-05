import ReactOnRails from 'react-on-rails';

import Header from '../components/dashboards/header';
import Sidebar from '../components/dashboards/sidebar';
import Footer from '../components/dashboards/footer';
import UniversityBox from '../components/universities/universities_box';
import LanguageBox from '../components/languages/languages_box';
import SubjectBox from '../components/subjects/subjects_box';
import TraineeTypeBox from '../components/trainee_types/trainee_types_box';
import TrainingStandardBox from '../components/training_standards/training_standards_box';
import StageBox from '../components/stages/stages_box';
import OrganizationBox from '../components/organizations/organizations_box';
import StaticPageBox from '../components/static_pages/static_pages_box';
import ProgramsBox from '../components/programs/programs_box';
import ProgramsShowBox from '../components/programs/programs_show_box';
import SubjectsShowBox from  '../components/subjects/subjects_show_box';
import TrainingStandardShowBox from '../components/training_standards/training_standard_show_box';

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
  StaticPageBox,
  ProgramsBox,
  ProgramsShowBox,
  SubjectsShowBox,
  TrainingStandardShowBox,
});
