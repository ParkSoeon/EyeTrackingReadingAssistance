extends Node

var access_token := ""
var current_node = "start"
var story= []
var choices = {}
var temp = [] # 선택 임시 보관 테스트 용도
var story_id =""
var play_id = ""

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

func get_choices():
	return temp

func get_nodes():
	return story
	
func set_story(id:String):
	story_id = id
	
func get_story():
	return story_id
	
func set_play(id:String):
	play_id = id
	
func get_play():
	return play_id
