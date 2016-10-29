from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:lcd@leohust.cn:3306/zhaoxin?charset=utf8'

db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    phone = db.Column(db.String(30), unique=True)
    email = db.Column(db.String(120), unique=True)
    name = db.Column(db.String(80))
    sex = db.Column(db.Integer(2))
    passwd = db.Column(db.String(80))
    '''专业'''
    major = db.Column(db.String(120))
    '''年级'''
    grade = db.Column(db.String(30))
    '''获奖情况'''
    prize = db.Column(db.String(500))
    '''技术特长'''
    accumulate = db.Column(db.String(500))
    '''自我简介'''
    self_intro = db.Column(db.String(500))
    '''个人规划'''
    self_plan = db.Column(db.String(500))


    def __init__(self, name,  phone):
        self.name = name
        self.phone = phone

    def __repr__(self):
        return '<User %r>' % self.name
