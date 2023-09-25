from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2

"""
def create_friend_requests_table(cursor, connection):
    try:
        # Create the friend_requests table
        cursor.execute(
            CREATE TABLE friend_requests (
                from_user_id INTEGER,
                to_user_id INTEGER,
                PRIMARY KEY (from_user_id, to_user_id)
            );)

        connection.commit()
        print("Table 'friend_requests' created successfully.")

    except psycopg2.Error as e:
        print("Error:", e)
        connection.rollback()

def create_friend_request(from_user_id, to_user_id, cur, conn):
    try:
        cur.execute("INSERT INTO friend_requests (from_user_id, to_user_id) VALUES (%s, %s);", (from_user_id, to_user_id))

        conn.commit()
        print("Friend request created successfully.")

    except psycopg2.Error as e:
        print("Error:", e)
        conn.rollback()

def check_friend_request_exists(from_user_id, to_user_id, cur, conn):
        cur.execute(
            SELECT EXISTS (
                SELECT 1
                FROM friend_requests
                WHERE from_user_id = %s AND to_user_id = %s
            );
        , (from_user_id, to_user_id))

        result = cur.fetchone()[0]
        conn.commit()

        return result




connection_url = 'postgresql://postgres:qvUy5QMuFtrflR6yW7xR@containers-us-west-177.railway.app:5936/railway'

try:
    connection = psycopg2.connect(connection_url)

    cursor = connection.cursor()

    cursor.execute(CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY
);

)
    connection.commit()
    create_friend_requests_table(cursor, connection)
    # Fetch and print the results
    # rows = cursor.fetchall()
    # for row in rows:
    #     print(row)

except (Exception, psycopg2.Error) as error:
    print('Error while connecting to PostgreSQL:', error)


# finally:
#     # Close the cursor and connection
#     if connection:
#         cursor.close()
#         connection.close()
#         print('PostgreSQL connection closed.')

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {'message': 'This is a CORS-enabled endpoint'}
    return jsonify(data)

@app.route('/api/make-user', methods=['POST'])
def make_user():
    query = "INSERT INTO users DEFAULT VALUES RETURNING id;"
    cursor.execute(query)   
    inserted_id = cursor.fetchone()[0]
    connection.commit()
    return {"id": inserted_id}

@app.route('/api/friend-request', methods=['POST'])
def send_friend_request():
    json_data = request.get_json()
    from_id, to_id = json_data.get("from_id"), json_data.get("to_id")


    # checking that the users exist within the table
    if not check_friend_request_exists(from_id, to_id, cursor, connection):
        
        create_friend_request(from_id, to_id, cursor, connection)
        return {"message": "Created friend request"}
    return {"message": "Already sent friend request"}

@app.route('/api/get-friend-requests', methods=['GET'])
def get_friend_request_pairs():
    cursor = connection.cursor()
    cursor.execute("SELECT from_user_id, to_user_id FROM friend_requests;")
    rows = cursor.fetchall()
    print(rows)

    friend_requests_list = [{'from_user_id': row[0], 'to_user_id': row[1]} for row in rows]

    connection.commit()

    # Return the data as JSON
    return jsonify(friend_requests_list)

@app.route('/api/get-users', methods=['GET'])
def get_users():
    cursor.executeSelect * from users)
    rows = cursor.fetchall()
    connection.commit()
    return rows

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

    import psycopg2


# PostgreSQL connection Railway URL
"""