from app.db.database import Base, engine
from app.models import issue  # important: ensures model is loaded


def init_database():
    Base.metadata.create_all(bind=engine)