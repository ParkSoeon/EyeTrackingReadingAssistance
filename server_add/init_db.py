
from crud.database import engine, Base
import models

def init_db():
    Base.metadata.create_all(bind=engine)  # 다시 테이블 생성

        
if __name__ == "__main__":
    init_db()


'''
from sqlalchemy import text
from crud.database import engine, Base
import models  # 모든 모델 import해서 Base.metadata에 반영되도록

def drop_all_tables_cascade():
    with engine.connect() as conn:
        with conn.begin():
            conn.execute(text("""
                DO $$ DECLARE
                    r RECORD;
                BEGIN
                    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
                        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
                    END LOOP;
                END $$;
            """))
    print("모든 테이블 CASCADE 삭제 완료")

def create_tables():
    Base.metadata.create_all(bind=engine)
    print("모든 테이블 생성 완료")

if __name__ == "__main__":
    drop_all_tables_cascade()
    create_tables()
'''