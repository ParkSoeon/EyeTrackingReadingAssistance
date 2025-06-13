extends Node

const url = "http://0.0.0.0:8000"

func post_token(username:String, password:String, callback:Callable):
	var body = "username=%s&password=%s" % [(username).uri_encode(), (password).uri_encode()]
	var headers = ["Content-Type: application/x-www-form-urlencoded"]
	
	var http_request = HTTPRequest.new()
	add_child(http_request)
	http_request.request(url+"/users/token/", headers, HTTPClient.METHOD_POST, body)
	http_request.request_completed.connect(_token_completed.bind(callback))
	STATE.set_user(username)
	
func _token_completed(result, response_code, headers, body, callback:Callable):
	var response = JSON.parse_string(body.get_string_from_utf8())

	if response_code == 200 and response.has("access_token"):
		STATE.set_token(response.get("access_token","err"))
		get_tree().change_scene_to_file("res://scenes/main.tscn")
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
			
func fetch_story_ids(callback:Callable):
	var http_request = HTTPRequest.new()
	add_child(http_request)
	http_request.request_completed.connect(self._on_fetch_story_ids_completed.bind(callback))

	var error = http_request.request(url+"/stories/")
	if error != OK:
		push_error("An error occurred while requesting story IDs.")
		
func _on_fetch_story_ids_completed(result, response_code, headers, body, callback:Callable):
	if response_code == 200:
		var response_text = body.get_string_from_utf8()
		var json = JSON.parse_string(response_text)
		
		var stories_list = []
		var story_ids = []

		if json != null:
			stories_list = json
			story_ids.clear()
			
			for story in stories_list:
				if story.has("story_id"):
					story_ids.append(story["story_id"])
					
			callback.call(story_ids)
		else:
			push_error("Failed to parse JSON from server.")
	else:
		push_error("Failed to fetch stories. Response code: %d" % response_code)

func download_story(story_id: String, callback:Callable):
	var http_request = HTTPRequest.new()
	add_child(http_request)
	var headers = ["Authorization: Bearer %s" % STATE.access_token,
					"Content-Type: application/json"]
	http_request.request_completed.connect(self._on_story_downloaded.bind(story_id, callback))
	var error = http_request.request(url+'/stories/'+story_id, headers)
	if error != OK:
		print("Error requesting story JSON.")

func _on_story_downloaded(result, response_code, headers, body, story_id, callback:Callable):
	if response_code == 200:
		var json_text = body.get_string_from_utf8()
		DirAccess.make_dir_recursive_absolute("user://stories")
		var file = FileAccess.open("user://stories/%s.json" % story_id, FileAccess.WRITE)
		if file:
			file.store_string(json_text)
			file.close()
	else:
		print("Story download failed:", response_code)
		callback.call("Story download failed:%d"%response_code)
