$(document).on('ready page:load', function () {
   console.log('new lesson js ready!')
   $(".selectize").selectize({
      create: true,
      plugins: ['remove_button']
   })


   // WIP: Filtered Sections based on Category Selection
   // const selectBoxId = "select#lesson_section_attributes_category_attributes_name"
   // let category = $(`${selectBoxId}`)
   
   // $(category).on("change", function() {
   //    let categoryName = $(`${selectBoxId}`).text()
   //    $.ajax({
   //       url: "/filtered_sections",
   //       type: "GET",
   //       data: {category_name: `${categoryName}`}
   //    }).done(function (data) {
   //       let selectDiv = $('div.selectize-dropdown-content')[1]
   //       selectDiv.innerHTML = `<div class="optgroup" data-group="${categoryName}">
   //       <div class="optgroup-header">${categoryName}</div>`
   //       console.log(data)
   //       data.forEach(function (section) {
   //          selectDiv +=
   //             `
   //             <div class="option" data-selectable="" data-value="${section.name}">${section.name}</div>
   //             `
            
   //       })
   //       selectDiv += "</div>"
   //       console.log(selectDiv)
   //    })
   // })

})