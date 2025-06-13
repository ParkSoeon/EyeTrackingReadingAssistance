extends Control

func _ready() -> void:
	pass


func _on_texture_button_pressed() -> void: # 임시
	STATE.set_story("story")
	await HttpClient.post_play(STATE.get_story())
	SceneTransitionLayer.change_scene_with_fade("res://scenes/story.tscn")
	#get_tree().change_scene_to_file("res://scenes/story.tscn")
	pass # Replace with function body.
