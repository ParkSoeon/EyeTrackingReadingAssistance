extends Node
signal finish

var url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" # API 키를 입력하세요

func _ready():
	pass
	


# HTTP 요청을 보내는 함수
func request(select:String):
	print("Sending request...")
	var data_to_send = {
		"contents": [{
			"parts": [{
				"text": "답변은 bbcode형식을 이용해 \n 답변은 간결하게 해줘 \n 필요없는 기호와 말은 넣지마\n 너는 게임에서 사용자의 선택을 돕는 친구야\n 게임에서 사용자가 매트릭스의 "+select+"을 선택했어.\n 하지만 사용자가 아직은 선택을 바꿀 수 있어\n 사용자의 선택이 올바른지 아니면 틀렸는지 다시 생각할 수 있게 친구에게 대화하 듯 조언해줘"
			}]
		}]
	}
	
	# HTTPRequest 노드를 생성하고, 시그널을 연결합니다.
	var http_request = HTTPRequest.new()
	add_child(http_request)
	http_request.request_completed.connect(self._http_request_completed)
	
	# 요청할 데이터를 JSON 문자열로 변환
	var json = JSON.stringify(data_to_send)
	var headers = ["Content-Type: application/json"]
	
	# HTTP POST 요청을 보냅니다.
	var error = http_request.request(url, headers, HTTPClient.METHOD_POST, json)
	if error != OK:
		push_error("An error occurred while making the HTTP request.")

# HTTP 요청이 완료되었을 때 호출되는 함수
func _http_request_completed(result, response_code, headers, body):
	if result == HTTPRequest.RESULT_SUCCESS:
		print("Request was successful!")
		# 응답 본문을 문자열로 가져오기
		var response_body = body.get_string_from_utf8()
		print("Response Body: ", response_body)  # 응답 본문 출력하여 확인

		# 응답이 JSON 형식인지 확인
		var json = JSON.new()
		var error = json.parse(response_body)
		
		if error == OK:
			var data_received = json.data
			# JSON 데이터가 객체인지 확인하고 그 안의 'candidates' 배열에 접근
			if typeof(data_received) == TYPE_DICTIONARY:
				print("Parsed JSON: ", data_received)  # 디버깅을 위해 전체 JSON을 출력
				# 응답이 candidates 배열을 포함하는 경우
				if data_received.has("candidates") and typeof(data_received["candidates"]) == TYPE_ARRAY:
					var candidates = data_received["candidates"]
					if candidates.size() > 0 and candidates[0].has("content"):
						var content = candidates[0]["content"]
						if content.has("parts") and content["parts"].size() > 0:
							var parts = content["parts"]
							if parts[0].has("text"):
								var text = parts[0]["text"]
								# LLM 응답을 텍스트 라벨에 표시
								#$Text.text = "LLM says: " + text.strip_edges()  # 공백을 제거한 후 텍스트를 표시
								var split_text = text.strip_edges().split("\n")  # 텍스트를 줄 바꿈 기준으로 나누기
								show_text_in_intervals(split_text, 2.0)  # 2초 간격으로 텍스트 출력
		else:
			print("JSON Parse Error: ", json.get_error_message())
	else:
		print("Request failed with response code: ", response_code)

# 각 줄을 일정 간격으로 출력하는 함수
func show_text_in_intervals(lines, interval):
	var label = $RichTextLabel  # RichTextLabel 노드를 찾기
	for line in lines:
		var current_text =""
		current_text += line + "\n"  # 각 줄을 이어서 현재 텍스트에 추가
		label.clear()
		label.bbcode_text = current_text  # RichTextLabel에 현재 텍스트 표시 (bbcode 형식)
		await get_tree().create_timer(interval).timeout 
	label.clear()
	finish.emit()
