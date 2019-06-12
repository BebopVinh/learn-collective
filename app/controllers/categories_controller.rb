class CategoriesController < ApplicationController
   before_action :set_category
   
   def show
      render json: @category, status: 201, include: ['sections.lessons']
   end

   private
      def set_category
         @category = Category.find_by_id(params[:id])
      end
end