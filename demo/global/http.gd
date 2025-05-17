extends Node

const url = "http://0.0.0.0:8000"

func post_token(username:String, password:String, callback:Callable):
	var body = "username=%s&password=%s" % [(username).uri_encode(), (password).uri_encode()]
	var headers = ["Content-Type: application/x-www-form-urlencoded"]
	
	var http_request = HTTPRequest.new()
	add_child(http_request)
	http_request.request(url+"/users/token/", headers, HTTPClient.METHOD_POST, body)
	http_request.request_completed.connect(_token_completed.bind(callback))
	
func _token_completed(result, response_code, headers, body, callback:Callable):
	var response = JSON.parse_string(body.get_string_from_utf8())

	if response_code == 200 and response.has("access_token"):
		STATE.set_token(response.get("access_token","err"))
		get_tree().change_scene_to_file("res://main.tscn")
	else:
		if typeof(response) == TYPE_DICTIONARY:
			var detail = response.get("detail","")
			callback.call(detail + ": " + str(response_code))

func post_chat(data: Dictionary, callback:Callable):
	var http_request = HTTPRequest.new()
	add_child(http_request)
	http_request.request_completed.connect(self._chat_completed.bind(callback))
	
	var json = JSON.stringify(data)
	var headers = ["Authorization: Bearer %s" % STATE.access_token,
					"Content-Type: application/json"]
	
	var error = http_request.request(url+"/chat/", headers, HTTPClient.METHOD_POST, json)
	if error != OK:
		push_error("An error occurred while making the HTTP request.")
		
		
func _chat_completed(result, response_code, headers, body, callback:Callable):
	var response = JSON.parse_string(body.get_string_from_utf8())
	
	if response_code == 401:
		if typeof(response) == TYPE_DICTIONARY:
			var detail = response.get("detail","")
			#print(detail)
			get_tree().change_scene_to_file("res://scenes/login.tscn")
	else:
		if typeof(response) == TYPE_DICTIONARY:
			var received = response.get("response","err")
			print(received)
			callback.call(received)
		else:
			pass
