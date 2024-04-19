class Api::EmailController < ApplicationController
  def create
    @json_data = JSON.parse(request.body.read)
    @sequence_item = SequenceItem.find(@json_data['sequence_item'])
    @email = Email.new(title: @json_data['title'], description: @json_data['description'], sequence_item: @sequence_item)
    if @email.save
      render json: @email
    else
      render error: { error: 'Unable to create email' }, status: 400
    end
  end
end
