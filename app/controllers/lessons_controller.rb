class LessonsController < ApplicationController
   include LessonsHelper
   before_action :find_lesson, only: [:show, :edit, :update, :destroy]
   before_action :authenticate_user!, except: [:index, :show]
   before_action :check_creator, only: [:edit, :update, :destroy]

   # WIP: Filtered Sections based on Category Selection
   # def filtered_sections
   #    @sections = Category.filtered_sections(params[:category_name])
   #    render json: @sections, status: 201, include: [:id, :name]
   # end

   def new
      @lesson = Lesson.new
      @section = @lesson.build_section
      @section.build_category
   end

   def create
      @lesson = Lesson.new(lesson_params) do |user|
         user.creator_id = current_user.id
      end

      if @lesson.save
         redirect_to lesson_path(@lesson), notice: "Lesson created!"
      else
         render :new
      end
   end

   def index
      @lessons = Lesson.all_sorted
   end

   def show
      if @lesson.nil?
         redirect_to lessons_path, alert: "Lesson not found."
      else
         respond_to do |format|
            format.html do
               @contribution = Contribution.new
               render :show
            end
            format.json do
               authenticate_user!
               render json: @lesson, status: 200, include: ['contributions.user']
            end 
         end
      end
   end

   def edit
   end

   def update
      if @lesson.update(lesson_params)
         redirect_to lesson_path(@lesson)
      else
         render :edit
      end
   end

   def destroy
      contributions = Contribution.where(lesson_id: @lesson.id)
      contributions.destroy_all
      @lesson.destroy
      redirect_to lessons_path, notice: "Lesson deleted"
   end

   private 
      def find_lesson
         @lesson = Lesson.find_by(id: params[:id])
      end

      def lesson_params
         params.require(:lesson).permit(:name, section_attributes: [:name, category_attributes: [:name]])
      end

      def check_creator
         if @lesson.creator_is?(current_user)
            return
         else
            redirect_to lessons_path, alert: "You are not permitted to modify this #{@lesson.name}."
         end
      end
end

