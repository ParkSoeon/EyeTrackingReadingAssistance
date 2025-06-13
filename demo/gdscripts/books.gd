extends Control

func _ready() -> void:
	HttpClient.fetch_story_ids(Callable(self,"set_books"))
	pass
	
func set_books(books:Array):
	for book in books:
		create_vbox_with_image(book)
		
func get_book(book:String):
	if FileAccess.file_exists("user://stories/%s.json"%book):
		return true
	else:
		show_downloading_popup()
		await HttpClient.download_story(book,Callable(self,"_download_failed"))
		hide_downloading_popup()
		return false


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
	label.add_theme_color_override("font_color", Color(0, 0, 0))
	
	vbox.add_child(label)
	$Panel/ScrollContainer/HBoxContainer.add_child(vbox)

func _on_story_vbox_clicked(event: InputEvent, name: String):
	if event is InputEventMouseButton and event.pressed:
		if  await get_book(name):
			STATE.set_story(name)
			await HttpClient.post_play(STATE.get_story())
			SceneTransitionLayer.change_scene_with_fade("res://scenes/story.tscn")



var downloading_popup: PopupPanel

func show_downloading_popup():
	downloading_popup = PopupPanel.new()
	downloading_popup.name = "DownloadingPopup"
	downloading_popup.set_size(Vector2(300, 100))

	var label = Label.new()
	label.text = "파일 다운로드 중입니다..."
	label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	label.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
	label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	label.size_flags_vertical = Control.SIZE_EXPAND_FILL

	downloading_popup.add_child(label)
	add_child(downloading_popup)

	downloading_popup.popup_centered()

func hide_downloading_popup():
	if downloading_popup:
		await get_tree().create_timer(0.3).timeout
		downloading_popup.queue_free()
		downloading_popup = null
func _download_failed(message):
	var dialog = AcceptDialog.new()
	dialog.set_size(Vector2(300, 100))
	dialog.dialog_text = message
	dialog.name = "ErrorDialog"

	add_child(dialog)
	dialog.popup_centered()
