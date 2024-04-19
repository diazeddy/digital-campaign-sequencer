class Api::TimeDelayController < ApplicationController
  def create
    @json_data = JSON.parse(request.body.read)
    @sequence_item = SequenceItem.find(@json_data['sequence_item'])
    @timeDelays = TimeDelay.new(period: @json_data['period'], sequence_item: @sequence_item)
    if @timeDelays.save
      render json: @timeDelays
    else
      render error: { error: 'Unable to create Time Delay' }, status: 400
    end
  end
end
