import { supabaseClient } from "./client";

// TODO: Create button and add this to onClick
export const logoutHandler = async () => {
  await supabaseClient.auth.signOut();
  window.localStorage.clear();
  window.location.reload();
};