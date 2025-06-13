extends Node


@onready var story_label = $StoryLabel
#@onready var background = $Background
#@onready var character = $Character
@onready var left_label = $Red/RedCollision/Label
@onready var right_label = $Blue/BlueCollision/Label
var choices
var choice
var prompt
var storyManager = preload("res://gdscripts/StoryManager.gd").new()

var effect: AudioEffect
var recording: AudioStreamWAV

var mix_rate := 48000
var format := AudioStreamWAV.FORMAT_16_BITS

func _ready():
	print("ready")
	load_story_node(STATE.current_node)
	STATE.save_node(STATE.current_node)
	#get_node("Player").visible = false
	#var device = AudioServer.get_input_device_list()
	AudioServer.input_device = AudioServer.get_input_device() # 댓글에 있었네..
	var idx = AudioServer.get_bus_index("Record")
	effect = AudioServer.get_bus_effect(idx, 0)

func load_story_node(node_id: String):
	storyManager.load_story_json("user://stories/%s.json"%STATE.get_story())
	var data = storyManager.get_node_data(node_id)
	if data.is_empty():
		push_error("존재하지 않는 노드: %s" % node_id)
		print("err")
		return
	# 텍스트 출력
	#story_label.text = data.get("text", "")
	#print(data.get("text", ""))
	get_node("Player").factor = 0
	prompt = data.get("text","")
	get_node("HUD").request(prompt+"이러한 상황이야 앞으로 내가 어떤 선택을 할거야 조언해줘")

	
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
	STATE.temp.append(choices[choice].id) # 테스트 용도
	#STATE.save_node(STATE.current_node)
	if STATE.current_node == "end":
		get_tree().change_scene_to_file("res://scenes/end.tscn")
	else:
		get_tree().change_scene_to_file("res://scenes/story.tscn")

func _on_red_portal_area_entered(area: Area2D) -> void:
	STATE.current_node = choices[choice].next_scene
	call_deferred("change_scene")


func _on_blue_portal_area_entered(area: Area2D) -> void:
	STATE.current_node = choices[choice].next_scene
	call_deferred("change_scene")


func _on_button_pressed() -> void:
	#if effect.is_recording_active():
		#stop_recording()
	#else:
		#start_recording()
	#print("pressed")
	#get_node("Player").factor = 1
	#get_node("HUD").request("안녕")
	var textEdit = get_node("TextEdit")
	var text = textEdit.text
	get_node("HUD").request(text)
	textEdit.text = ""

var output_path := "res://recorded.wav"
	
func start_recording():
	print("녹음 시작")
	effect.set_recording_active(true)

func stop_recording():
	print("녹음 종료 및 저장")
	recording = effect.get_recording()
	effect.set_recording_active(false)
	
	recording.set_mix_rate(mix_rate)
	recording.set_format(format)
	
	recording.save_to_wav(output_path)
	print("저장됨: ", output_path)
	
