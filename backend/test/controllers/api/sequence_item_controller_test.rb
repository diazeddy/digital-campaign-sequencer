require "test_helper"

class Api::SequenceItemControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get api_sequence_item_create_url
    assert_response :success
  end
end
