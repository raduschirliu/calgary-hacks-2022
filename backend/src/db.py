import os
import psycopg2
import uuid
import datetime
import threading
from psycopg2.extras import RealDictCursor

# global variable of database url
DATABASE_URL = os.getenv("DATABASE_URL")

conn = psycopg2.connect(DATABASE_URL, sslmode='require')

cursor = conn.cursor()


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
    conn = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = conn.cursor(cursor_factory=RealDictCursor)
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
        conn.close()
        return id
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        return "Failed to post workspace."

def post_workspace_user(workspace_id, user_id):
    conn = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = conn.cursor(cursor_factory=RealDictCursor)
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
        conn.close()
        return "OK"
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        return "Failed to post workspace_user."

def get_workspaces(user_id):
    # return a list of all workspaces {id, name} associated with a user (from WORKSPACE_USER)
    conn = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    sql = "SELECT workspace_id FROM workspace_user WHERE user_id = %s"
    cursor.execute(sql, (user_id))
    workspace_ids = cursor.fetchall()
    sql = "SELECT * FROM workspace WHERE id = %s"
    result = []
    for workspace_id in workspace_ids:
        cursor.execute(sql, (workspace_id))
        workspace = cursor.fetchall()
        result.add(workspace) 
    conn.close()
    return result

def get_workspace_users(workspace_id):
    # return a list of all users {id, name, email} in a workspace (from WORKSPACE_USER)
    return "ok"

def get_workspace_tasks(workspace_id):
    # return a list of all tasks {id, deadline, difficulty, name, category, workspace_id} in a workspace (from TASK)
    return "ok"

def post_task(deadline, difficulty, name, category, workspace_id):
    conn = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = conn.cursor(cursor_factory=RealDictCursor)
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
        conn.close()
        return id
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        return "Failed to post task."

def get_task(task_id):
    # return task from TASK
    return "ok"

def get_num_times_completed(task_id):
    # return # of times the task_id appears in USER_TASK
    return "ok"

def post_user_task(user_id, task_id):
    conn = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = conn.cursor(cursor_factory=RealDictCursor)
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
        conn.close()
        return id
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        return "Failed to post user_task."

def put_points(workspace_id, user_id, points):
    # update row in WORKSPACE_USER by adding points to total score
    return "ok"
