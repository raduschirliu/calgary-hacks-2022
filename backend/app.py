import os
import re
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from src import constants, auth, db

# Load environment variables
load_dotenv()

db.create_tables()

# Load DB tables

# Setup Flask and variables
port = int(os.getenv('PORT', 8000))
app = Flask(__name__)

app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)

# Routes
@app.route('/')
@cross_origin()
def hello_world():
    return 'hello, world'

# Main
if __name__ == '__main__':
    app.run(port=port, threaded=True)

# Add a new workspace
@app.route('/workspace', methods=['POST'])
@cross_origin()
def post_workspace():
    # auth
    jwt = auth.verify_jwt()
    if jwt == False:
        return "Unauthorized", 401
    # post a workspace to the db
    req = request.json
    workspace_id = db.post_workspace(req['name'])
    # add calling user to the workspace
    user_id = jwt['sub']
    return db.post_workspace_user(workspace_id, user_id)

# Add users to workspace
@app.route('/workspace/<workspace_id>/invite', methods=['POST'])
@cross_origin()
def post_invite(workspace_id):
    # auth
    jwt = auth.verify_jwt()
    if jwt == False:
        return "Unauthorized", 401  
    # add each user to workspace
    req = request.json
    users = req['users']
    for user_id in users:
        result = db.post_workspace_user(workspace_id, user_id)
        if result != "OK":
            return "Error"
    return "OK"

# Get a user's workspaces
@app.route('/workspace', methods=['GET'])
@cross_origin()
def get_workspace():
    # auth
    jwt = auth.verify_jwt()
    if jwt == False:
        return "Unauthorized", 401  
    # get user's workspace ids
    result = db.get_workspaces(jwt['sub'])
    return jsonify(result)

# Get users in a workspace
@app.route('/workspace/<workspace_id>/users', methods=['GET'])
@cross_origin()
def get_workspace(workspace_id):
    # auth
    jwt = auth.verify_jwt()
    if jwt == False:
        return "Unauthorized", 401  
    # get users in a workspace
    result = db.get_workspace_users(workspace_id)
    return jsonify(result)

# Get tasks in a workspace
@app.route('/workspace/<workspace_id>/tasks', methods=['GET'])
@cross_origin()
def get_workspace(workspace_id):
    # auth
    jwt = auth.verify_jwt()
    if jwt == False:
        return "Unauthorized", 401  
    # get tasks for a ws
    result = db.get_workspace_tasks(workspace_id)
    return jsonify(result)

# Post task to a workspace
@app.route('/task', methods=['POST'])
@cross_origin()
def post_task():
    # auth
    jwt = auth.verify_jwt()
    if jwt == False:
        return "Unauthorized", 401
    # post a workspace to the db
    req = request.json
    task_id = db.post_task(req['deadline'], req['difficulty'], req['name'], req['category'], req['workspace_id'])
    return task_id

# Mark task as done
@app.route('/task/<task_id>', methods=['PUT'])
@cross_origin()
def put_task(task_id):
    # auth
    jwt = auth.verify_jwt()
    if jwt == False:
        return "Unauthorized", 401
    # mark task as done and calc/add points
    user_id = jwt['sub']
    task = db.get_task(task_id)
    # calc points
    scale_factor = 100 - min(db.get_num_times_completed(task_id), constants.MIN_PLACEMENT_FOR_BONUS)*10
    points = scale_factor/100 * task['difficulty'] * constants.POINTS_PER_DIFFICULTY_LEVEL
    # update task complete time and user points
    db.post_user_task(user_id, task_id)
    workspace_id = task['workspace_id']   
    return db.put_points(workspace_id, user_id, points)