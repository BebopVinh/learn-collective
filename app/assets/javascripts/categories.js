$(document).on('ready page:load', function () {
   console.log("ready!")
   $("a.category").click(function (event) {
      event.preventDefault()
      let id = $(this).data("id")
      let categoryChild = ""
      $.get(`/categories/${id}.json`, function (categories) {
         const sections = categories["sections"].map(section => section)
         sections.forEach(function (section) {
            categoryChild += `
               \<div class="section" id="${section["id"]}" data-id="${section["id"]}">
                  <p>${section["name"]}</p>\
               </div>\
            `
         })
         $(`a.category#${id}`).append(`<ul>${categoryChild}</ul>`)
      })
   })


})