"""
Models package initialization
"""

# Import models here to make them available when importing from models
# These imports are delayed to avoid circular dependencies
def get_user_model():
    from .user import User
    return User

def get_play_model():
    from .play import Play
    return Play

def get_choice_model():
    from .choice import Choice
    return Choice

# For convenience, you can still import the classes directly
# but they will be imported only when first accessed
User = get_user_model()
Play = get_play_model()
Choice = get_choice_model()