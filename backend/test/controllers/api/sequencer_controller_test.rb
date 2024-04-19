require "test_helper"

class Api::SequencerControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get api_sequencer_create_url
    assert_response :success
  end

  test "should get index" do
    get api_sequencer_index_url
    assert_response :success
  end
end
