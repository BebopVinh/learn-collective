class SectionsController < ApplicationController
   before_action :authenticate_user!

   def show
      @section = Section.find_by_id(params[:id])
      render json: @section, status: 201
   end
end