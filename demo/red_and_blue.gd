extends Node

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass


func _on_red_area_shape_entered(area_rid: RID, area: Area2D, area_shape_index: int, local_shape_index: int) -> void:
	get_node("Player").factor = 0
	get_node("HUD").request("빨간약")
	get_node("Red/Sprite2D").modulate = Color(0, 0, 0, 0.4)
	get_node("Blue/Sprite2D").modulate = Color(0, 0, 0, 0.8)


func _on_blue_area_entered(area: Area2D) -> void:
	get_node("Player").factor = 0
	get_node("HUD").request("파란약")
	get_node("Red/Sprite2D").modulate = Color(0, 0, 0, 0.8)
	get_node("Blue/Sprite2D").modulate = Color(0, 0, 0, 0.4)


func _on_hud_finish() -> void:
	get_node("Player").factor = 1
