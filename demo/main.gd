extends Node

var storyManager = preload("res://gdscripts/StoryManager.gd").new()
# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	load_story()
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass


func _on_player_hit() -> void:
	# 물리 콜백 중에 노드를 직접적으로 제거하지 않도록 deferred 호출
	call_deferred("change_scene")

func change_scene():
	get_tree().change_scene_to_file("res://scenes/choice.tscn")
	
func load_story():
	storyManager.load_story_json("res://story/story.json")
	var data = storyManager.get_node_data(STATE.current_node)
	if data.is_empty():
		push_error("존재하지 않는 노드")
		print("err")
		return
	var text = data.text
	text = text.replace("\n", ".").replace(",", ".")
	var result = text.split(".", false)
	# 텍스트 출력
	show_text(result,2.0)


func show_text(lines, interval=2.0):
	var label = $Player/Story
	for line in lines:
		var current_text = ""
		current_text += line + "   "
		label.modulate.a = 0.0
		label.text = current_text
		label.visible = true
		label.create_tween().tween_property(label, "modulate:a", 1.0, 0.5)
		await get_tree().create_timer(interval).timeout 
	make_portal()
func make_portal():
	var position = $Player.position
	var portal = preload("res://portal.tscn").instantiate()
	add_child(portal)
	
	portal.global_position = position + Vector2(1920, 0)
	portal.visible = true
	portal.sleeping = false
