export const APP_NAME = 'http://localhost:3000/';
export const AXIOS_CONFIG = {headers: {'Accept': 'application/json'}};
export const ROOT_PATH = '';
export const DEFAULT_IMAGE_COURSE_URL = '/assets/edu.jpg';
export const DEFAULT_IMAGE_SUBJECT_URL = '/assets/subject.jpeg';
export const DEFAULT_IMAGE_USER_URL = '/assets/profile.png';
export const LIMIT_DESCRIPTION = 36;
export const ACCEPT_DOCUMENT_TYPES = 'application/pdf,.doc,.docx';
export const MAX_DOCUMENT_SIZE = 15;

export function isOverMaxDocumentSize(file) {
  let is_over = (file.size/1048576) >= MAX_DOCUMENT_SIZE;
  if (is_over) {
    alert(I18n.t("documents.alert.max_file_size"));
  }
  return is_over;
}
