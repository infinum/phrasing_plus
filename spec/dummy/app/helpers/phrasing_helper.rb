module PhrasingHelper
  # You must implement the can_edit_phrases? method.
  # Example:
  #
  # def can_edit_phrases?
  #  current_user.is_admin?
  # end

  def can_edit_phrases?
    ENV['CAN_EDIT_PHRASES'].nil? ? true : ENV['CAN_EDIT_PHRASES']
  end

end
