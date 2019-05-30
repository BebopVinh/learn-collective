class UsersController < ApplicationController
   before_action :authenticate_user!

   def show
      @user = current_user
      # @contributions = @user.contributions.reverse
      @contributions = Contribution.order_by_name(@user)
   end
end