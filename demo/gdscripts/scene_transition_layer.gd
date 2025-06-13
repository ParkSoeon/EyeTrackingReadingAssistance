extends CanvasLayer

@onready var anim_player = $AnimationPlayer
@onready var color_rect = $ColorRect

# 씬 전환 함수
func change_scene_with_fade(scene_path):
	$ColorRect.visible = true
	anim_player.play("fade_in")
	await anim_player.animation_finished
	get_tree().change_scene_to_file(scene_path)
	anim_player.play("fade_out")
	$ColorRect.visible = false
