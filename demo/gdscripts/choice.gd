extends Node


#@onready var story_label = $StoryLabel
#@onready var background = $Background
#@onready var character = $Character
@onready var left_label = $Red/RedCollision/Label
@onready var right_label = $Blue/BlueCollision/Label
var choices
var choice
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
	choices = data.get("choices", [])
	left_label.text = choices[0].text
	right_label.text = choices[1].text

func _on_red_area_entered(area: Area2D) -> void:
	choice = 0
	var select = choices[choice].text
	get_node("Player").factor = 0
	get_node("HUD").request(prompt+"사용자는"+select+"를 선택했어.")
	get_node("Red/Sprite2D").modulate = Color(0, 0, 0, 0.4)
	get_node("Blue/Sprite2D").modulate = Color(0, 0, 0, 0.8)

func _on_blue_area_entered(area: Area2D) -> void:
	choice = 1
	var select = choices[choice].text
	get_node("Player").factor = 0
	get_node("HUD").request(prompt+"사용자는"+select+"를 선택했어.")
	get_node("Red/Sprite2D").modulate = Color(0, 0, 0, 0.8)
	get_node("Blue/Sprite2D").modulate = Color(0, 0, 0, 0.4)


func _on_hud_finish() -> void:
	get_node("Player").factor = 1
	
func change_scene():
	get_tree().change_scene_to_file("res://scenes/choice.tscn")

func _on_red_portal_area_entered(area: Area2D) -> void:
	STATE.current_node = choices[choice].id
	call_deferred("change_scene")


func _on_blue_portal_area_entered(area: Area2D) -> void:
	STATE.current_node = choices[choice].id
	call_deferred("change_scene")
