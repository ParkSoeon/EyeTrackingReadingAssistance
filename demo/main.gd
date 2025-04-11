extends Node


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass


func _on_player_hit() -> void:
	# 물리 콜백 중에 노드를 직접적으로 제거하지 않도록 deferred 호출
	call_deferred("change_scene")

func change_scene():
	get_tree().change_scene_to_file("res://scenes/choice.tscn")
