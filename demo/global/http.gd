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
		# TODO 스토리 선택 페이지 구성 후 아래 내용 수정
		STATE.set_story("test_1")
		await post_play(STATE.get_story())
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

func post_play(story_id:String):
	var http_request = HTTPRequest.new()
	add_child(http_request)
	http_request.request_completed.connect(self._play_completed)
	var data = {"story_id":story_id}
	
	var json = JSON.stringify(data)
	var headers = ["Authorization: Bearer %s" % STATE.access_token,
					"Content-Type: application/json"]
	
	var error = http_request.request(url+"/plays/", headers, HTTPClient.METHOD_POST, json)
	if error != OK:
		push_error("An error occurred while making the HTTP request.")
	
func _play_completed(result, response_code, headers, body):
	var response = JSON.parse_string(body.get_string_from_utf8())

	if response_code == 200 and response.has("id"):
		STATE.set_play(response.get("id","err"))
	else:
		if typeof(response) == TYPE_DICTIONARY:
			pass

func post_story(scene_id:Array, choices:Array):
	var http_request = HTTPRequest.new()
	add_child(http_request)
	http_request.request_completed.connect(self._story_completed)
	var data = []
	for i in range(scene_id.size()):
		var choice_data = {
		"play_id": STATE.get_play(),
		"story_id": STATE.get_story(),
		"scene_key": scene_id[i],
		"choice_id": choices[i],
		}
		data.append(choice_data)
	print(data)
	var json = JSON.stringify(data)
	var headers = ["Authorization: Bearer %s" % STATE.access_token,
					"Content-Type: application/json"]
	
	var error = http_request.request(url+"/choices/", headers, HTTPClient.METHOD_POST, json)
	if error != OK:
		push_error("An error occurred while making the HTTP request.")
	
func _story_completed(result, response_code, headers, body):
	var response = JSON.parse_string(body.get_string_from_utf8())

	if response_code == 200:
		pass
	else:
		print(response)
		if typeof(response) == TYPE_DICTIONARY:
			pass
