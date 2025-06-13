extends Node

var story_data = {}  # 전체 JSON 데이터 저장

func load_story_json(path: String):
	var file = FileAccess.open(path, FileAccess.READ)
	if file:
		var raw_text = file.get_as_text()
		var result = JSON.parse_string(raw_text)

		if typeof(result) == TYPE_DICTIONARY:
			story_data = result
		else:
			push_error("JSON 형식 오류")
			DirAccess.remove_absolute(path)
		
		file.close()
	else:
		push_error("스토리 파일을 열 수 없습니다.")

func get_node_data(node_id: String) -> Dictionary:
	return story_data.get(node_id, {})
