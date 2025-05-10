extends Node

var current_node = "start"
var story= []
var choices = {}

func save_node(node:String):
	story.append(node)

func save_choice(key: String, value):
	choices[key] = value

func get_choice(key: String):
	return choices.get(key, null)

func get_nodes():
	return story
