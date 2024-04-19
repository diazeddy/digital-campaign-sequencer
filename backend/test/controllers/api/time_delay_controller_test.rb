require "test_helper"

class Api::TimeDelayControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get api_time_delay_create_url
    assert_response :success
  end
end
