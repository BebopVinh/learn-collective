const idsArray = []
$(document).on('ready page:load', function () {
   function getLessonIds() {
      $.get("/lessons.json", function (lessons) {
         lessons.forEach(lesson => {
            idsArray.push(lesson.id)
         })
      })
   }
   //Invoking to get an array of lesson ids for a.lesson-browser event
   getLessonIds()
   class Lesson {
      constructor(obj) {
         this.name = obj.name
         this.id = obj.id
         this.contributions = obj.contributions
      }
   }

   let currentUserId //blank variable to store current user's id if logged in
   $.get('/authenticate/user.json', function (token) {
      currentUserId = token.id
   })

   // function to generate update buttons if content belongs to current user
   function checkId(sourceId, currentUserId) {
      if (sourceId === currentUserId) {
         return true
      } else {
         return false
      }
   }

   function generateContributionHTML(contribution) {
      let htmlString = `<section class="post">
         <header class="post-header">
            <h2 class="post-title">From ${contribution.user.username}</h2>
         </header>
         <div class="post-description">${contribution.parsed_content}</div>
      `
      if (checkId(contribution.user.id, currentUserId)) {
         htmlString += `
            <p>
               <a class="pure-button pure-button-primary button-small" href="/contributions/${contribution.id}/edit">Update Contribution</a>
            </p></section>`
      } else {
         htmlString += `</section>`
      } 
      return htmlString
   }

   Lesson.prototype.contributionContent = function () {
      const contributions = this.contributions
      let resultHTML = ""
      contributions.forEach(function (contribution) {
         resultHTML += generateContributionHTML(contribution)
      })
      return resultHTML
   }


   $('form.new_contribution').submit(function (event) {
      event.preventDefault()
      const lessonId = parseInt($('input#lesson-id').val(), 10)
      let values = $(this).serialize();
      $.post(`/lessons/${lessonId}/contributions`, values)
         .done(function (contribution) {
            let contributionHTML = generateContributionHTML(contribution)
            $('div.lesson-contributions').append(contributionHTML)
            alert("New contribution created!")
         })
         .fail(function () {
            alert("Something went wrong :(")
         })
   });


   $('a.lesson-browser').click(function (event) {
      event.preventDefault()
      let lessonId = parseInt($("input#lesson-id").val(), 10)
      let lessonIndex = idsArray.indexOf(lessonId)
      if (this.id === "next") {
         lessonIndex++
      } else if (this.id === "previous") {
         lessonIndex--
      }
      lessonId = idsArray[lessonIndex]

      if (lessonIndex === 0 && this.id === "previous") {
         this.style.display = "none"
      } else if (lessonIndex === (idsArray.length - 1) && this.id === "next") {
         this.style.display = "none"
      } else {
         $('a.lesson-browser')[0].style.display = "block"
         $('a.lesson-browser')[1].style.display = "block"
      }

      $.get(`/lessons/${lessonId}.json`, function (lesson) {
         let currentLesson = new Lesson(lesson)
         $('h1.post-title').html(`Lesson: ${currentLesson.name}`)
         $('input#lesson-id').val(currentLesson.id)
         let contributionHTML = currentLesson.contributionContent()
         $('div.lesson-contributions').html(contributionHTML)
         if (checkId(currentLesson.id, currentUserId)) {
            $('div#edit-button').html(
               `<a href="/lessons/${currentLesson.id}/edit" class="pure-button button-warning">Edit this Lesson</a>`
            )
         }
      })
   })
})