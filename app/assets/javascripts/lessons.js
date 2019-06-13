$(document).on('ready page:load', function () {
   
   class Lesson {
      constructor(obj) {
         this.name = obj.name
         this.id = obj.id
         this.contributions = obj.contributions
      }
   }

   Lesson.prototype.contributionContent = function () {
      const contributions = this.contributions
      let resultHTML = ""
      debugger
      contributions.forEach(function (contribution) {
         resultHTML += `
         <section class="post">
            <header class="post-header">
               <h2 class="post-title">From ${contribution.user.username}</h2>
            
            </header>
            <div class="post-description trix-content">
               ${contribution.content}
            </div>
         </section>
         `
      })
      debugger
      return resultHTML
   }


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
         debugger
      })
   })
})