extends Node
signal finish

var data = {
  "provider": "gemini",
  "messages": [
  ]
}

func _ready():
	pass	


func request(select:String):
	var data_to_send = {
		"role":"user",
		"content": select
	}
	data["messages"].append(data_to_send)
	HttpClient.post_chat(data, Callable(self, "recieved"))
	
func recieved(response: String):
	var recieved = {
		"role": "assistant",
		"content": response
	}
	data["messages"].append(recieved)
	var lines = response.split("\n")
	show_text_in_intervals(lines, 2)

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
