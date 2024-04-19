class Api::SequenceItemController < ApplicationController 
  def create
    @json_data = JSON.parse(request.body.read)
    @sequencer = Sequencer.find(@json_data['sequencer'])
    @sequence_item = SequenceItem.new(itemType: @json_data['itemType'], sequencer: @sequencer)
    if @sequence_item.save
      render json: @sequence_item
    else
      render error: { error: 'Unable to create Sequence Item' }, status: 400
    end
  end
end
