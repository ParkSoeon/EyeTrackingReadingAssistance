extends Control

func _ready() -> void:
	create_vbox_with_image("test")
	pass

func get_local_story_ids():
	var dir = DirAccess.open("user://stories")
	var story_ids = []
	if dir:
		dir.list_dir_begin()
		var filename = dir.get_next()
		while filename != "":
			if filename.ends_with(".json"):
				var story_id = filename.get_basename()  # "pinocchio.json" → "pinocchio"
				story_ids.append(story_id)
				filename = dir.get_next()
				dir.list_dir_end()
		return story_ids


func create_vbox_with_image(name: String):
	# VBoxContainer 생성
	var vbox = VBoxContainer.new()
	vbox.name = "StoryVBox_" + name
	vbox.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	vbox.size_flags_vertical = Control.SIZE_EXPAND_FILL
	

	# Panel 생성
	var panel = Panel.new()
	panel.custom_minimum_size = Vector2(300, 300)
	panel.add_theme_stylebox_override("panel", StyleBoxEmpty.new())
	
	panel.mouse_filter = Control.MOUSE_FILTER_STOP
	panel.connect("gui_input", Callable(self, "_on_story_vbox_clicked").bind(name))

	# TextureRect 생성
	var texture_rect = TextureRect.new()
	texture_rect.texture = load("res://art/book.png")
	texture_rect.expand = true
	texture_rect.expand_mode = TextureRect.EXPAND_IGNORE_SIZE  # Ignore Size
	texture_rect.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_CENTERED  # 비율 유지
	texture_rect.anchor_left = 0
	texture_rect.anchor_top = 0
	texture_rect.anchor_right = 1
	texture_rect.anchor_bottom = 1
	texture_rect.offset_left = 0
	texture_rect.offset_top = 0
	texture_rect.offset_right = 0
	texture_rect.offset_bottom = 0

	# Panel에 TextureRect 추가
	panel.add_child(texture_rect)

	# VBoxContainer에 Panel 추가
	vbox.add_child(panel)
	
	var label = Label.new()
	label.text = name
	label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	label.add_theme_font_size_override("font_size", 50)
	label.add_theme_color_override("font_color", Color(1, 0, 0))
	
	vbox.add_child(label)
	$Panel/ScrollContainer/HBoxContainer.add_child(vbox)

func _on_story_vbox_clicked(event: InputEvent, name: String):
	if event is InputEventMouseButton and event.pressed:
		STATE.set_story(name)
		await HttpClient.post_play(STATE.get_story())
		SceneTransitionLayer.change_scene_with_fade("res://scenes/story.tscn")
