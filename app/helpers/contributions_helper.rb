module ContributionsHelper
   def update_buttons(contribution)
      if contribution.user == current_user
         button_to "Edit Contribution", edit_contribution_path(contribution), method: :get, class: "pure-button pure-button-primary button-small"
      end
   end
end