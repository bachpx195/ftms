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
    for(var members_id of data.members_ids) {
      if(members_id == current_user.id) {
        result = false;
        break;
      }
    }
    return result;
  },
  owner: (data) => {
    var current_user = $.parseJSON(localStorage.current_user);
    if (current_user.id == data.owner_id) {
      return true;
    }
    return false;
  },
  setOwner: (data) => {
    if (data.organization_ids && data.organization_ids.length > 0) {
      return true;
    }
    return false;
  }
}
