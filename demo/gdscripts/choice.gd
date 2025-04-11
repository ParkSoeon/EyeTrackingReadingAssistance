extends Node


#@onready var story_label = $StoryLabel
#@onready var background = $Background
#@onready var character = $Character
@onready var left_label = $Red/RedCollision/Label
@onready var right_label = $Blue/BlueCollision/Label
var left
var left_id
var right
var right_id
var prompt
var storyManager = preload("res://gdscripts/StoryManager.gd").new()

func _ready():
	print("ready")
	load_story_node(STATE.current_node)

func load_story_node(node_id: String):
	storyManager.load_story_json("res://story/story.json")
	var data = storyManager.get_node_data(node_id)
	if data.is_empty():
		push_error("존재하지 않는 노드: %s" % node_id)
		print("err")
		return
	# 텍스트 출력
	#story_label.text = data.get("text", "")
	print(data.get("text", ""))
	
	prompt = data.get("prompt","")
	
	## 선택지 세팅
	var choices = data.get("choices", [])
	left_id = choices[0].id
	left = choices[0].text
	left_label.text = left
	right_id = choices[1].id
	right = choices[1].text
	right_label.text = right

func _on_choice_selected(choice_id: String):
	# 선택 시 플래그 저장 가능
	var node_data = storyManager.get_node_data(STATE.current_node)
	var flags = node_data.get("flags", {})
	#for key in flags.keys():
		#Global.set(key, flags[key])
		
	load_story_node(choice_id)

func _on_red_area_entered(area: Area2D) -> void:
	get_node("Player").factor = 0
	get_node("HUD").request(prompt+"사용자는"+left+"을 선택했어.")
	get_node("Red/Sprite2D").modulate = Color(0, 0, 0, 0.4)
	get_node("Blue/Sprite2D").modulate = Color(0, 0, 0, 0.8)
	print("in")
	pass # Replace with function body.


func _on_red_area_exited(area: Area2D) -> void:
	STATE.current_node = left_id
	get_tree().change_scene_to_file("res://scenes/choice.tscn")
	print("out")
	pass # Replace with function body.


func _on_blue_area_entered(area: Area2D) -> void:
	get_node("Player").factor = 0
	get_node("HUD").request(prompt+"사용자는"+right+"을 선택했어.")
	get_node("Red/Sprite2D").modulate = Color(0, 0, 0, 0.8)
	get_node("Blue/Sprite2D").modulate = Color(0, 0, 0, 0.4)
	print("in")
	pass # Replace with function body.


func _on_blue_area_exited(area: Area2D) -> void:
	STATE.current_node = right_id
	get_tree().change_scene_to_file("res://scenes/choice.tscn")
	pass # Replace with function body.


func _on_hud_finish() -> void:
	get_node("Player").factor = 1
