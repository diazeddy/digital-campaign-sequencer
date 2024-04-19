class Api::SequencerController < ApplicationController
  def create
    @json_data = JSON.parse(request.body.read)
    @sequencer = Sequencer.new(title: @json_data["title"], trigger: @json_data["trigger"])
    if @sequencer.save
      render json: @sequencer
    else
      render error: { error: 'Unable to create email' }, status: 400
    end
  end

  def index
    sequencers = Sequencer.includes(sequence_items: [ :email, :time_delay ]).all

    render json: sequencers, only: [:id, :title, :trigger], include: {
      sequence_items: {
        only: [:id, :itemType],
        include: {
          email: {
            only: [:id, :title, :description]
          },
          time_delay: {
            only: [:id, :period]
          }
        }
      }
    }
  end
end
