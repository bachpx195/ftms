class PoliciesChannel < ApplicationCable::Channel
  def subscribed
    if params[:id] && current_user.id == params[:id]
      user = User.find_by(id: params[:id])
      channel = "#{params[:id]}_user_channel"
      stream_from channel
      ActionCable.server.broadcast(
        channel,
        functions: user.functions
      )
    end
  end
end
