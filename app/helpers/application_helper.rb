module ApplicationHelper

   def auth_buttons
      if user_signed_in?
         link_to '<i class="fas fa-sign-out-alt"></i> Sign Out'.html_safe, destroy_user_session_path, method: :delete, class: "pure-button"
      else
         link_to '<i class="fas fa-sign-in-alt"></i> Sign In'.html_safe, new_user_session_path, method: :get, class: "pure-button"
      end
   end
end
