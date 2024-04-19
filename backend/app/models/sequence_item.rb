class SequenceItem < ApplicationRecord
  belongs_to :sequencer
  has_one :email
  has_one :time_delay
end
