from flask import Flask, request, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from models import *

from dotenv import dotenv_values

config = dotenv_values(".env")
app = Flask(config.get('NAME'))
app.config['SQLALCHEMY_DATABASE_URI'] = config.get('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = config.get('SQLALCHEMY_TRACK_MODIFICATIONS')

db = SQLAlchemy(app)


class Projects(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name_project = db.Column(db.String)
    image_project = db.Column(db.Text, default=None)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return '<Project %r>' % self.id


class TodoList(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    todo_title = db.Column(db.String(255), nullable=False)
    ischecked = db.Column(db.Boolean, default=False)
    
    
class Theme(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    background_color = db.Column(db.String(100))
    btn_color=db.Column(db.String(100))
    h1_color=db.Column(db.String(100))
    
    
@app.route('/', methods=['POST'])
def create_todo():
    if(request.method == 'POST'):
        d = request.get_data()
        todo_title = d.decode('utf-8').replace('"', ' ')
        todo_item = TodoList(todo_title=todo_title)
        try:
            db.session.add(todo_item)
            db.session.commit()
            return redirect('/')
        except:
            return "error"
    
    
@app.route('/todo/<int:id>', methods=['DELETE'])
def delete_todo(id):
    try:
        response = {}
        todo = TodoList.query.get(id)
        response['id']=todo.id
        db.session.delete(todo)
        db.session.commit()
        return redirect('/')
    except:
        return "error"

@app.route('/get_list', methods=['GET'])
def get_todos():
    data = TodoList.query.order_by('id').all()
    output = []
    for d in data:
        currTodo={}
        currTodo['id'] = d.id
        currTodo['todo_title'] = d.todo_title
        currTodo['ischecked'] = d.ischecked
        output.append(currTodo)
    return jsonify(output)
    
    
@app.route('/change_theme', methods=['GET'])
def get_theme():
    data = Theme.query.order_by('id').all()
    output=[]
    for d in data:
        currTheme={}
        currTheme['id']=d.id
        currTheme['background_color']=d.background_color
        currTheme['btn_color']=d.btn_color
        currTheme['h1_color']=d.h1_color
        output.append(currTheme)
    return jsonify(output)
       
@app.route('/todo/update/<int:id>', methods=['PUT'])
def update_todo(id):
    try:
        res = {}
        d = TodoList.query.filter_by(id=id).first()
        if d.ischecked:
            d.ischecked = False
        else:
            d.ischecked = True
        
        db.session.commit()
        return redirect('/')
    except:
        return "Error"
            
        




if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=config.get('DEBUG'))