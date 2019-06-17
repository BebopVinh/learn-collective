module ContributionsHelper
   def update_buttons(contribution)
      if contribution.user == current_user
         button_to "Update Contribution", edit_contribution_path(contribution), method: :get, class: "pure-button pure-button-primary button-small"
      end
   end

   def parse_content(content)
      options = {
      filter_html:     true,
      hard_wrap:       true,
      link_attributes: { rel: 'nofollow', target: "_blank" },
      space_after_headers: true,
      fenced_code_blocks: true
      }

      extensions = {
      autolink: true,
      genced_code_blocks: true,
      strikethrough: true,
      superscript: true,
      underline: true,
      quote: true,
      disable_indented_code_blocks: false
      }

      renderer = Redcarpet::Render::HTML.new(options)
      markdown = Redcarpet::Markdown.new(renderer, extensions)
      markdown.render(content) unless (content == nil || content == "")
   end
end