extends Control

@onready var greeting = $VBoxContainer/Greeting
@onready var stroy_button = $VBoxContainer/StoryButton
@onready var my_page_button = $VBoxContainer/Mypage


func _on_story_button_pressed() -> void:
		get_tree().change_scene_to_file("res://scenes/story.tscn")


func _on_mypage_button_pressed() -> void:
	pass # Replace with function body.
