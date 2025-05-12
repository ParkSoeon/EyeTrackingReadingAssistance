extends Control

@onready var username_field = $VBoxContainer/Name/UsernameField
@onready var password_field = $VBoxContainer/HBoxContainer/PasswordField
@onready var message_label = $VBoxContainer/MessageLabel
@onready var login_button = $VBoxContainer/LoginButton
var http := HTTPRequest.new()

func _ready():
	add_child(http)
	login_button.pressed.connect(_on_login_button_pressed)

func _on_login_button_pressed():
	var username = username_field.text
	var password = password_field.text

	var url = "http://0.0.0.0:8000/token"
	var body = "username=%s&password=%s" % [(username).uri_encode(), (password).uri_encode()]
	var headers = ["Content-Type: application/x-www-form-urlencoded"]
	
	var err = http.request(
		url,
		headers,
		HTTPClient.METHOD_POST,
		body
	)
		
	http.request(url, headers, HTTPClient.METHOD_POST, body)
	http.request_completed.connect(_on_request_completed)

func _on_request_completed(result, response_code, headers, body):
	var response = JSON.parse_string(body.get_string_from_utf8())
	message_label.text = ""

	if response_code == 200 and response.has("access_token"):
		STATE.set_token(response.get("access_token","err"))
		get_tree().change_scene_to_file("res://main.tscn")
	else:
		message_label.text = str(response_code)
