extends Control

@onready var username_field = $VBoxContainer/Name/UsernameField
@onready var password_field = $VBoxContainer/Password/PasswordField
@onready var message_label = $VBoxContainer/MessageLabel
@onready var login_button = $VBoxContainer/LoginButton

func _on_login_button_pressed():
	print("User data path: ", OS.get_user_data_dir())
	var username = username_field.text
	var password = password_field.text

	HttpClient.post_token(username, password, Callable(self, "show_message"))

func show_message(message:String):
	message_label.text = message
