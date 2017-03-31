export const CustomFunction = {
  creator: (data) => {
    if(!data.creator_id) return false;
    var current_user = $.parseJSON(localStorage.current_user);
    return current_user.id == data.creator_id;
  },
}
