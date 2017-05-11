import _ from 'lodash';
export const CustomFunction = {
  creator: (data) => {
    if (!data.creator_id) return false;
    var current_user = $.parseJSON(localStorage.current_user);
    return current_user.id == data.creator_id;
  },
  ownerController: (data) => {
    var path = window.location.pathname;
    var regex = new RegExp('^\/' + data.controller + '.*');
    return path.search(regex) >= 0
  },
  course_manager: (data) => {
    var result = true;
    if(data.length == 0) return result;
    var current_user = $.parseJSON(localStorage.current_user);
    for(var member_id of data.member_ids) {
      if(member_id == current_user.id) {
        result = false;
        break;
      }
    }
    return result;
  },
  owner: (data) => {
    var current_user = $.parseJSON(localStorage.current_user);
    if (current_user.id == data.owner_id_course ||
      current_user.id == data.creator_id_program ||
      current_user.id == data.owner_id_organization) {
      return true;
    }
    return false;
  },
  setOwner: (data) => {
    if (data.organization_ids && data.organization_ids.length > 0) {
      return true;
    }
    return false;
  },
  setUserTeam: (data) => {
    var current_user_id = $.parseJSON(localStorage.current_user).id;
    var status = 'in_progress';
    var result = false;
    if (data.course_subject_teams) {
      for(var subject_team of data.course_subject_teams) {
        var user_subject = subject_team.user_subjects.filter(subject => {
          return subject.user_id.toString().toLowerCase().includes(
            current_user_id.toString().toLowerCase())
            && subject.status.toLowerCase().includes(status.toLowerCase())});
        if (user_subject.length > 0) {
          result = true;
          break;
        }
      }
    }
    return result;
  },
  ownerById: (data) => {
    var current_user = $.parseJSON(localStorage.current_user);
    if (current_user.id == data.id) {
      return true;
    }
    return false;
  },
  belongById: (data) => {
    var profile = $.parseJSON(localStorage.profile);
    if(!profile) return false;
    return profile[data.key] == data.id
  },
  creatorByIds: (data) => {
    var current_user = $.parseJSON(localStorage.current_user);
    return $.inArray(current_user.id, data.ids) >= 0;
  },
  ownerByIds: (data) => {
    var current_user = $.parseJSON(localStorage.current_user);
    return $.inArray(current_user.id, data.ids) >= 0;
  },
  correctUser: (data) => {
    var current_user = $.parseJSON(localStorage.current_user);
    return current_user.id == data.id
  },
  memberOfTeam: (data) => {
    var teams_of_project_ids = _.map(data.teams_of_project,
      item => item.id
    );
    var result = false;
    for(var team of data.current_user_teams){
      if($.inArray(team.id, teams_of_project_ids) >=0){
        result = true;
        break;
      }
    }
    return result;
  }
}
