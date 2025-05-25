extends Node

var storyManager = preload("res://gdscripts/StoryManager.gd").new()
@onready var story_label = $StroyLabel
# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	print(STATE.get_nodes())
	load_story_node(STATE.current_node)
	load_all_story()
	HttpClient.post_story(STATE.get_nodes(),STATE.get_choices())
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass

func load_story_node(node_id: String):
	storyManager.load_story_json("res://story/story.json")
	var data = storyManager.get_node_data(node_id)
	if data.is_empty():
		push_error("존재하지 않는 노드: %s" % node_id)
		print("err")
		return
	# 텍스트 출력
	story_label.text = data.get("text", "")

func load_all_story() -> void:
	storyManager.load_story_json("res://story/story.json")
	var nodes = STATE.get_nodes()
	for node in nodes:
		var data = storyManager.get_node_data(node)
		if data.is_empty():
			pass
		else:
			print(data.text)
	pass


func _on_home_button_pressed() -> void:
	get_tree().change_scene_to_file("res://scenes/main.tscn")
	pass # Replace with function body.


func _on_analyze_button_pressed() -> void:
	OS.shell_open("https://www.naver.com")
	pass # Replace with function body.
