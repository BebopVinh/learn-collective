$(document).on('ready page:load', function () {
   console.log("categories.js ready!")
   $("a.category").click(function (event) {
      event.preventDefault()
      $("ul.section").remove()
      let id = $(this).data("id")
      let categoryChild = ""
      $.get(`/categories/${id}.json`, function (categories) {
         const sections = categories["sections"].map(section => section)
         sections.forEach(function (section) {
            categoryChild += `
               <div class="section" id="${section["id"]}" data-id="${section["id"]}">
                  <a href="#" class="section" data-id="${section["id"]}">${section["name"]}</a>
               </div>
            `
         })
         $(`div.category#${id}`).append(
            `<ul class="section">
               <strong>Sections</strong>
               <br><br>
               ${categoryChild}
            </ul>`
         )
      })
   })

   $(document).on('click', 'a.section', function(event) {
      event.preventDefault()
      let id = $(this).data("id")
      $("ul.lesson").remove()
      let sectionChild = ""
      $.get(`/sections/${id}.json`, function (section) {
         const lessons = section["lessons"]
         lessons.forEach(function(lesson) {
            sectionChild += `
               <li>
                  <a href="/lessons/${lesson["id"]}">${lesson["name"]}</a>
               </li>
            `
         })

         $(`div.section#${id}`).append(
            `<ul class="lesson">
               <br>
               <strong>Lessons</strong>
               <br><br>
               ${sectionChild}
               <br>
            </ul>`
         )
      })
   })

})

