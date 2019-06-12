class CategoriesController < ApplicationController
   before_action :set_category

   def index
      @categories = Category.all
      respond_to do |format|
         format.html {render :index}
         format.json {render json: @categories, status: 201}
      end
   end
   
   def show
      render json: @category, status: 201, include: ['sections.lessons']
   end

   private
      def set_category
         @category = Category.find_by_id(params[:id])
      end
end