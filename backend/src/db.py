import os
import psycopg2
import uuid
import datetime
import threading

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
        difficulty varchar(255) NOT NULL,
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
        score varchar(255) NOT NULL,

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
        current_streak varchar(255) NOT NULL,

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
