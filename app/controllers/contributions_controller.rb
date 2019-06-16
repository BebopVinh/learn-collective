class ContributionsController < ApplicationController
   before_action :authenticate_user!
   before_action :find_contribution, :check_contributor, only: [:edit, :update, :destroy]

   # before_action :check_contributor, only: [:edit, :update, :destroy]

   def create
      lesson = Lesson.find_by(id: params[:lesson_id])
      @contribution = Contribution.new(user: current_user, lesson: lesson, content: contribution_params[:content])
      if @contribution.save
         # respond_to do |format|
         #    format.html {redirect_to lesson_path(lesson)}
         #    format.json {render json: @contribution}
         # end
         render json: @contribution
      else
         redirect_to lesson_path(lesson), alert: "Content was empty."
      end
   end

   def edit
   end

   def update
      if @contribution.update(contribution_params)
         redirect_to lesson_path(@contribution.lesson)
      else
         render :edit
      end
   end

   def destroy
      @lesson = @contribution.lesson
      @contribution.destroy
      redirect_to lesson_path(@lesson), notice: "Contribution deleted"
   end

   private
      def contribution_params
         params.require(:contribution).permit(:content)
      end

      def find_contribution
         @contribution = Contribution.find_by(id: params[:id])
      end

      def check_contributor
         if @contribution.user != current_user
            redirect_to lesson_path(@contribution.lesson), alert: "You are not permitted to modify that contribution."
         end
      end
end