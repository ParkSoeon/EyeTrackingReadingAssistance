extends Node

var access_token := ""
var current_node = "start"
var story= []
var choices = {}

func set_token(token: String) -> void:
	access_token = token

func get_token() -> String:
	return access_token

func save_node(node:String):
	story.append(node)

func save_choice(key: String, value):
	choices[key] = value

func get_choice(key: String):
	return choices.get(key, null)

func get_nodes():
	return story
