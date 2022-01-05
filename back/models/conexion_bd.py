from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine('mysql://degustame_user:d3gust4m3123$$@degustame.cqvzuclhbvcr.us-west-1.rds.amazonaws.com/degustame')

Base = declarative_base()
Session = sessionmaker(bind = engine)