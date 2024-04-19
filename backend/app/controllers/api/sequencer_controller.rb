class Api::SequencerController < ApplicationController
  def create
    @sequencer = Sequencer.new(sequencer_params)
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

  def show
    @sequencer = Sequencer.find(params[:id])
    render json: @sequencer
  end

  private

  def sequencer_params
    params.require(:sequencer).permit(:title, :trigger)
  end
end
