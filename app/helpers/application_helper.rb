module ApplicationHelper
   def markdown(text)
      options = {
      filter_html:     true,
      hard_wrap:       true,
      link_attributes: { rel: 'nofollow', target: "_blank" },
      space_after_headers: true,
      fenced_code_blocks: true
      }

      extensions = {
      autolink:           true,
      superscript:        true,
      disable_indented_code_blocks: true
      }

      renderer = Redcarpet::Render::HTML.new(options)
      markdown = Redcarpet::Markdown.new(renderer, extensions)
      markdown.render(text).html_safe unless text == nil
   end



   def auth_buttons
      if user_signed_in?
         link_to '<i class="fas fa-sign-out-alt"></i> Sign Out'.html_safe, destroy_user_session_path, method: :delete, class: "pure-button"
      else
         link_to '<i class="fas fa-sign-in-alt"></i> Sign In'.html_safe, new_user_session_path, method: :get, class: "pure-button"
      end
   end
end
