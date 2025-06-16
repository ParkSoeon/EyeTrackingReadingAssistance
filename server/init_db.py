from server.crud.database import engine, SessionLocal
from server.models.base import Base
import server.models # Import models to ensure they are registered with SQLAlchemy
from server.crud.user import create_test_user

def init_db():
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        create_test_user(db)
        print("Test user 'testuser' created (if not already exists).")
    except Exception as e:
        print(f"Error creating test user: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    init_db()