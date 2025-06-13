extends Area2D
signal hit

var server_ip = "*"
var server_port = 5001
var tcp_server = null
var client_socket = null

var factor = 1
@export var speed = 400 # How fast the player will move (pixels/sec).
@export var left_factor = 1
@export var right_factor = 1
var screen_size # Size of the game window.

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	screen_size = get_viewport_rect().size
	#hide()
	# TCP 서버 초기화
	tcp_server = TCPServer.new()
	
	var err = tcp_server.listen(server_port, server_ip)
	if err != OK:
		print("Error: Unable to start TCP server")
		return
	
	print("Server is listening on port ", server_port)


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	# 새로운 클라이언트 연결 수신
	if tcp_server.is_connection_available():
		client_socket = tcp_server.take_connection()
		print("Client connected")

	# 클라이언트로부터 데이터 수신
	if client_socket and client_socket.get_available_bytes() > 0:
		var data = client_socket.get_data(1)  # 1바이트 받기
		if data.size() == 2:
			if data[0] == OK:
				#print(data[1])
				move(data[1][0], delta)
	var velocity = Vector2.ZERO # The player's movement vector.
	if Input.is_action_pressed("move_right"):
		velocity.x += 1 * factor * right_factor
	if Input.is_action_pressed("move_left"):
		velocity.x -= 1 * factor * left_factor
	#if Input.is_action_pressed("move_down"):
		#velocity.y += 1
	#if Input.is_action_pressed("move_up"):
		#velocity.y -= 1

	if velocity.length() > 0:
		velocity = velocity.normalized() * speed
		$AnimatedSprite2D.animation = "walk"
		$AnimatedSprite2D.play()
	else:
		$AnimatedSprite2D.stop()
		$AnimatedSprite2D.animation = "idle"
		
	position += velocity * delta
	#position = position.clamp(Vector2.ZERO, screen_size)
	
	if velocity.x < 0:
		$AnimatedSprite2D.flip_h = false
	else:
		$AnimatedSprite2D.flip_h = true


#func _on_body_entered(_body):
	#hide() # Player disappears after being hit.
	#hit.emit()
	## Must be deferred as we can't change physics properties on a physics callback.
	#$CollisionShape2D.set_deferred("disabled", true)
	#
#func start(pos):
	#position = pos
	#show()
	#$CollisionShape2D.disabled = false


func _on_body_entered(body: Node2D):
	hide()
	print("hit")
	hit.emit()
	
func move(cmd, delta):	
	var direction = cmd
	var velocity = Vector2.ZERO  # 기본적으로 멈춤 상태

	if direction == 10: velocity.x += 1 * factor * right_factor
	elif direction == 34: velocity.x += 1 * factor * right_factor
	elif direction == 18: velocity.x += 1 * factor * right_factor
	elif direction == 9: velocity.x += -1 * factor * left_factor
	elif direction == 33: velocity.x += -1 * factor * left_factor
	elif direction == 17: velocity.x += -1 * factor * left_factor
	
	if direction == 0: velocity = Vector2.ZERO
	
	if velocity.length() > 0:
		velocity = velocity.normalized() * speed
		$AnimatedSprite2D.play()
	else:
		$AnimatedSprite2D.stop()
		
	position += velocity * delta
	#position = position.clamp(Vector2.ZERO, screen_size)
	
	if velocity.x < 0:
		$AnimatedSprite2D.flip_h = false
	else:
		$AnimatedSprite2D.flip_h = true
