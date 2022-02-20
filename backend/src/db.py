import os
import psycopg2
import uuid
import datetime
import threading
from psycopg2.extras import RealDictCursor

# global variable of database url
DATABASE_URL = os.getenv("DATABASE_URL")

conn = psycopg2.connect(DATABASE_URL, sslmode='require')

cursor = conn.cursor(cursor_factory=RealDictCursor)

# single database table creation function

def create_tables():
    lock = threading.Lock()

    with lock:
        create_user_table()
        create_workspace_table()
        create_workspace_user_table()
        create_task_table()
        create_user_task_table()
        create_workspace_stat_table()

# functions for creating database tables


def create_user_table():
    sql = """
    CREATE TABLE IF NOT EXISTS users(
        id varchar(255) NOT NULL PRIMARY KEY,
        name varchar(255) NOT NULL,
        email varchar(255) NOT NULL
    );
    """

    try:
        cursor.execute(sql)
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)


def create_workspace_table():
    sql = """
    CREATE TABLE IF NOT EXISTS workspace(
        id varchar(255) NOT NULL PRIMARY KEY,
        name varchar(255) NOT NULL
    );
    """

    try:
        cursor.execute(sql)
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)


def create_task_table():
    sql = """
    CREATE TABLE IF NOT EXISTS task(
        id varchar(255) NOT NULL PRIMARY KEY,
        deadline timestamp without time zone NOT NULL,
        difficulty int NOT NULL,
        name varchar(255) NOT NULL,
        category varchar(255) NOT NULL,
        workspace_id varchar(255) NOT NULL
    );
    """

    try:
        cursor.execute(sql)
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

# user_id is a foreign key(??)


def create_workspace_user_table():
    sql = """
    CREATE TABLE IF NOT EXISTS workspace_user(
        workspace_id varchar(255) NOT NULL,
        user_id varchar(255) NOT NULL,
        score int NOT NULL,

        PRIMARY KEY(workspace_id, user_id)
    );
    """
    try:
        cursor.execute(sql)
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)


def create_user_task_table():
    sql = """
    CREATE TABLE IF NOT EXISTS user_task(
        user_id varchar(255) NOT NULL ,
        task_id varchar(255) NOT NULL,
        timestamp timestamp without time zone NOT NULL,
        
        PRIMARY KEY(task_id, user_id)
    );
    """
    try:
        cursor.execute(sql)
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)


def create_workspace_stat_table():
    sql = """
    CREATE TABLE IF NOT EXISTS workspace_stat(
        workspace_id varchar(255) NOT NULL,
        current_streak_user_id varchar(255) NOT NULL ,
        current_streak int NOT NULL,

        PRIMARY KEY(workspace_id, current_streak_user_id)
    );
    """
    try:
        cursor.execute(sql)
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

# workspace endpoints

def get_workspace(workspace_id):
    sql = "SELECT * FROM workspace WHERE workspace_id = %s"
    cursor.execute(sql, (workspace_id))
    return cursor.fetchall()


def get_task(workspace_id):
    sql = "SELECT * FROM workspace WHERE workspace_id = %s"
    cursor.execute(sql, (workspace_id))
    return cursor.fetchall()

## HELPER FUNCTIONS ##

def post_workspace(name):
    id = str(uuid.uuid4())
    sql = """
    INSERT INTO workspace (
        id,
        name
        ) VALUES (%s, %s)
    """
    try:
        cursor.execute(sql, (id, name))  
        conn.commit()
        return id
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        return "Failed to post workspace."

def post_workspace_user(workspace_id, user_id):
    sql = """
    INSERT INTO workspace_user (
        workspace_id,
        user_id,
        score
        ) VALUES (%s, %s, %s)
    """
    try:
        cursor.execute(sql, (workspace_id, user_id, 0))  
        conn.commit()
        return "OK"
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        return "Failed to post workspace_user."

def user_in_workspace(user_id, workspace_id):
    sql = "SELECT * FROM workspace_user WHERE user_id = %s and workspace_id = %s"
    cursor.execute(sql, (user_id, workspace_id))
    result = cursor.fetchall()
    if result == None or len(result) > 0:
        return True
    return False

def get_user_id(email):
    sql = "SELECT id FROM users WHERE email = %s"
    cursor.execute(sql, (email,))
    user_id = cursor.fetchone()
    if user_id == None or len(user_id) == 0:
        return None
    return user_id

def get_workspaces(user_id):
    # return a list of all workspaces {id, name} associated with a user (from WORKSPACE_USER)
    sql = "SELECT workspace_id FROM workspace_user WHERE user_id = %s"
    cursor.execute(sql, (user_id,))
    workspace_ids = cursor.fetchall()
    sql = "SELECT * FROM workspace WHERE id = %s"
    result = []
    for row in workspace_ids:
        row = dict(row)
        cursor.execute(sql, (row["workspace_id"],))
        workspace = cursor.fetchone()
        result.append(workspace)
    return result

def get_workspace_users(workspace_id):
    # return a list of all users {id, name, email} in a workspace (from WORKSPACE_USER)
    sql = "SELECT user_id FROM workspace_user WHERE workspace_id = %s"
    cursor.execute(sql, (workspace_id,))
    user_ids = cursor.fetchall()
    sql = "SELECT * FROM user WHERE id = %s"
    result = []
    for row in user_ids:
        row = dict(row)
        cursor.execute(sql, (row["user_id"],))
        user = cursor.fetchone()
        result.append(user)
    return result

def get_workspace_tasks(workspace_id):
    # return a list of all tasks {id, deadline, difficulty, name, category, workspace_id} in a workspace (from TASK)
    sql = "SELECT id FROM task WHERE workspace_id = %s"
    cursor.execute(sql, (workspace_id,))
    task_ids = cursor.fetchall()
    sql = "SELECT * FROM task WHERE id = %s"
    result = []
    for row in task_ids:
        row = dict(row)
        cursor.execute(sql, (row["id"],))
        user = cursor.fetchone()
        result.append(user)
    return result

def post_task(deadline, difficulty, name, category, workspace_id):
    id = str(uuid.uuid4())
    sql = """
    INSERT INTO task (
        id,
        deadline,
        difficulty,
        name,
        category,
        workspace_id
        ) VALUES (%s, %s, %s, %s, %s, %s)
    """
    try:
        cursor.execute(sql, (id, deadline, difficulty, name, category, workspace_id))  
        conn.commit()
        return id
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        return "Failed to post task."

def get_task(task_id):
    sql = "SELECT * FROM task WHERE task_id = %s"
    cursor.execute(sql, (task_id,))
    task = cursor.fetchone()
    return task

def get_num_times_completed(task_id):
    sql = "SELECT * FROM user_task WHERE task_id = %s"
    cursor.execute(sql, (task_id,))
    tasks = cursor.fetchall()
    return len(tasks)

def post_user_task(user_id, task_id):
    dt = datetime.now()
    sql = """
    INSERT INTO user_task (
        user_id,
        task_id,
        timestamp
        ) VALUES (%s, %s, %s)
    """
    try:
        cursor.execute(sql, (user_id, task_id, dt))  
        conn.commit()
        return id
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        return "Failed to post user_task."

def put_points(workspace_id, user_id, points):
    # update row in WORKSPACE_USER by adding points to total score
    # get current score
    sql = "SELECT score FROM workspace_user WHERE workspace_id = %s AND user_id = %s"
    cursor.execute(sql, (workspace_id, user_id))
    score = cursor.fetchone()
    # update score
    sql = "UPDATE workspace_user SET score = %s WHERE workspace_id = %s AND user_id = %s"
    new_score = score + points # might have to convert score into int
    try:
        cursor.execute(sql, (workspace_id, user_id, str(new_score)))
        conn.commit()
        return new_score
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        return "Error updating points"
