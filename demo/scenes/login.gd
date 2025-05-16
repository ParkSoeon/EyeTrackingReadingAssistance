extends Control

@onready var username_field = $VBoxContainer/Name/UsernameField
@onready var password_field = $VBoxContainer/HBoxContainer/PasswordField
@onready var message_label = $VBoxContainer/MessageLabel
@onready var login_button = $VBoxContainer/LoginButton

func _ready():
	login_button.pressed.connect(_on_login_button_pressed)

func _on_login_button_pressed():
	var username = username_field.text
	var password = password_field.text

	HttpClient.post_token(username, password, Callable(self, "show_message"))

func show_message(message:String):
	message_label.text = message
