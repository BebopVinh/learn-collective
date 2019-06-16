$(document).on('ready page:load', function () {
   
   class Lesson {
      constructor(obj) {
         this.name = obj.name
         this.id = obj.id
         this.contributions = obj.contributions
      }
   }

   let currentUserId
   $.get('/authenticate/user.json', function (token) {
      currentUserId = token.id
   })

   function checkId(sourceId, currentUserId) {
      if (sourceId === currentUserId) {
         return true
      } else {
         return false
      }
   }

   Lesson.prototype.contributionContent = function () {
      const contributions = this.contributions
      let resultHTML = ""
      contributions.forEach(function (contribution) {
         resultHTML += `
         <section class="post">
            <header class="post-header">
               <h2 class="post-title">From ${contribution.user.username}</h2>
            </header>
            <div class="post-description trix-content">
               ${contribution.content}
            </div>
         `
         if (checkId(contribution.user.id, currentUserId)) {
            resultHTML += `
               <p>
                  <a class="pure-button pure-button-primary button-small" href="/contributions/${contribution.id}/edit">Update Contribution</a>
               </p></section>
            `
         } else {
            resultHTML += `</section>`
         }
      })
      return resultHTML
   }


   $('form.new_contribution').submit(function (event) {
      event.preventDefault()
      const lessonId = parseInt($('input#lesson-id').val(), 10)
      let values = $(this).serialize();
      $.post(`/lessons/${lessonId}/contributions`, values)
      .done(function(data) {
         console.log(data)
         let contributionHTML = `
            <section class="post">
               <header class="post-header">
                  <h2 class="post-title">From ${data.user.username}</h2>
               </header>
               <div class="post-description trix-content">${data.content}</div>
               <p>
               <a class="pure-button pure-button-primary button-small" href="/contributions/${data.id}/edit">Update Contribution</a>
               </p>
            </section>`
         $('div.lesson-contributions').append(contributionHTML)
      })   
   });


   $('a.lesson-browser').click(function(event) {
      event.preventDefault()
      let lessonId = parseInt($("input#lesson-id").val(), 10)
      if (this.id === "next") {
         lessonId++
      } else if (this.id === "previous") {
         lessonId--
      }
      $.get(`/lessons/${lessonId}.json`, function(lesson) {
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