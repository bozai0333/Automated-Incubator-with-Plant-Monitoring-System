import os
from datetime import datetime, timedelta
from flask import Flask, Response, request, jsonify, make_response, send_file, render_template
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo import DESCENDING
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask_mail import Mail, Message
import numpy as np

load_dotenv()

app = Flask(__name__)

mongo_db_url = os.environ.get("MONGO_DB_CONN_STRING")

client = MongoClient(mongo_db_url)
db = client['sensors_db']

#Sending mail to myself
app.config['MAIL_SERVER'] ='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'ngan420074@gmail.com'
app.config['MAIL_PASSWORD'] = 'chtr dwlo eqjz nqbb'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

# Dictionary to keep track of the last email sent time
last_ph_high_email_time = {}
last_ph_low_email_time = {}
last_ph_ideal_email_time={}
last_ec_high_email_time = {}
last_ec_low_email_time = {}
last_ec_ideal_email_time={}
last_brightness_high_email_time = {}
last_brightness_low_email_time = {}
last_high_temp_low_ex_email_time = {}
last_high_temp_high_ex_email_time = {}
last_low_temp_low_ex_email_time = {}
last_low_temp_high_ex_email_time = {}
last_high_humidity_email_time = {}
last_low_humidity_email_time = {}
last_humidifier_on_time = {}
last_all_on_time = {}
last_pump_alert_email_time = {}


#Email ph too high 
@app.route('/phhigh', methods = ['GET','POST'])
def sending_mail_ph_high():
    if request.method =='POST':
        recipient = 'cutebozai@gmail.com'
        if recipient not in last_ph_high_email_time or (datetime.now() - last_ph_high_email_time[recipient]) >= timedelta(hours=1):
            msg = Message("High pH Value", sender = 'ngan420074@gmail.com',
                        recipients = ['cutebozai@gmail.com'])
            msg.body = "Please add pH down solution (phosphoric acid) to the tank until pH value is reduced to range 5-6.5 (check pH graph for latest reading)"
            mail.send(msg)
            last_ph_high_email_time[recipient] = datetime.now()  # Record the time it was sent
            resp = jsonify({"message": "High pH alert email sent successfully"})
            resp.status_code = 200
            return resp
        
        else:
            resp = jsonify({"message": "The ph high alert email is sent"})
            resp.status_code = 200
            return resp


#Email ph too low 
@app.route('/phlow', methods = ['GET','POST'])
def sending_mail_ph_low():
    if request.method =='POST':
        recipient = 'cutebozai@gmail.com'
        if recipient not in last_ph_low_email_time or (datetime.now() - last_ph_low_email_time[recipient]) >= timedelta(hours=1):
            msg = Message("Low pH Value", sender = 'ngan420074@gmail.com',
                        recipients = ['cutebozai@gmail.com'])
            msg.body = "Please add pH up solution to the tank until ph value is increased to range 5-6.5 (check pH graph for latest reading)"
            mail.send(msg)
            last_ph_low_email_time[recipient] = datetime.now()  # Record the time it was sent
            resp = jsonify({"message": "Low pH alert email sent successfully"})
            resp.status_code = 200
            return resp

        else:
            resp = jsonify({"message": "The ph low alert email is still on cooldown"})
            resp.status_code = 200
            return resp


@app.route('/phideal', methods = ['GET','POST'])
def sending_mail_ph_ideal():
    if request.method =='POST':
        recipient = 'cutebozai@gmail.com'
        if recipient not in last_ph_ideal_email_time or (datetime.now() - last_ph_ideal_email_time[recipient]) >= timedelta(hours=1):
            msg = Message("Ideal pH Value", sender = 'ngan420074@gmail.com',
                        recipients = ['cutebozai@gmail.com'])
            msg.body = "The pH is in ideal range, you can add little bit of pH up or pH down solution based on whether the current pH is closer to acidic or alkaline."
            mail.send(msg)
            last_ph_ideal_email_time[recipient] = datetime.now()  # Record the time it was sent
            resp = jsonify({"message": "Ideal pH email sent successfully"})
            resp.status_code = 200
            return resp

        else:
            resp = jsonify({"message": "The pH ideal email is still on cooldown"})
            resp.status_code = 200
            return resp

#Email EC too high 
@app.route('/echigh', methods = ['GET','POST'])
def sending_mail_ec_high():
    if request.method =='POST':
        recipient = 'cutebozai@gmail.com'
        if recipient not in last_ec_high_email_time or (datetime.now() - last_ec_high_email_time[recipient]) >= timedelta(hours=1):
            msg = Message("High EC Value", sender = 'ngan420074@gmail.com',
                        recipients = ['cutebozai@gmail.com'])
            msg.body = "Please add more water to the tank until EC level until is reduced to range 1.2-2 (check EC graph for latest reading)"
            mail.send(msg)
            last_ec_high_email_time[recipient] = datetime.now()  # Record the time it was sent
            resp = jsonify({"message": "High EC alert email sent successfully"})
            resp.status_code = 200
            return resp

        else:
            resp = jsonify({"message": "The ec high alert email is still on cooldown"})
            resp.status_code = 200
            return resp
        
#Email EC too low 
@app.route('/eclow', methods = ['GET','POST'])
def sending_mail_ec_low():
    if request.method =='POST':
        recipient = 'cutebozai@gmail.com'
        if recipient not in last_ec_low_email_time or (datetime.now() - last_ec_low_email_time[recipient]) >= timedelta(hours=1):
            msg = Message("Low EC Value", sender = 'ngan420074@gmail.com',
                        recipients = ['cutebozai@gmail.com'])
            msg.body = "Please add more A/B water to the tank, increase EC level until it is in range 1.2-2 (check EC graph for latest reading)"
            mail.send(msg)
            last_ec_low_email_time[recipient] = datetime.now()  # Record the time it was sent
            resp = jsonify({"message": "Low EC alert email sent successfully"})
            resp.status_code = 200
            return resp

        else:
            resp = jsonify({"message": "The ec low alert email is sent"})
            resp.status_code = 200
            return resp
        
#Email ec ideal
@app.route('/ecideal', methods = ['GET','POST'])
def sending_mail_ec_ideal():
    if request.method =='POST':
        recipient = 'cutebozai@gmail.com'
        if recipient not in last_ec_ideal_email_time or (datetime.now() - last_ec_ideal_email_time[recipient]) >= timedelta(hours=1):
            msg = Message("Ideal EC Value", sender = 'ngan420074@gmail.com',
                        recipients = ['cutebozai@gmail.com'])
            msg.body = "The EC is in ideal range, you can add little bit of water or A/B solution based on whether the current EC is closer to lower or upper limit"
            mail.send(msg)
            last_ec_low_email_time[recipient] = datetime.now()  # Record the time it was sent
            resp = jsonify({"message": "Ideal EC email sent successfully"})
            resp.status_code = 200
            return resp

        else:
            resp = jsonify({"message": "The pH ideal email is still on cooldown"})
            resp.status_code = 200
            return resp


#Email lamp not switched on
@app.route('/lowbrightness', methods = ['GET','POST'])
def sending_mail_low_brightness():
    if request.method =='POST':
        recipient = 'cutebozai@gmail.com'
        if recipient not in last_brightness_low_email_time or (datetime.now() - last_brightness_low_email_time[recipient]) >= timedelta(hours=1):
            msg = Message("Low Greenhouse Brightness", sender = 'ngan420074@gmail.com',
                        recipients = ['cutebozai@gmail.com'])
            msg.body = "Please check whether the lamp is working, LDR detects low brightness"
            mail.send(msg)
            last_brightness_low_email_time[recipient] = datetime.now()  # Record the time it was sent
            resp = jsonify({"message": "Low brightness alert email sent successfully"})
            resp.status_code = 200
            return resp

        else:
            resp = jsonify({"message": "The low brightness alert email is still on cooldown"})
            resp.status_code = 200
            return resp

#Email lamp not switched off
@app.route('/idealbrightness', methods = ['GET','POST'])
def sending_mail_high_brightness():
    if request.method =='POST':
        recipient = 'cutebozai@gmail.com'
        if recipient not in last_brightness_high_email_time or (datetime.now() - last_brightness_high_email_time[recipient]) >= timedelta(hours=1):
            msg = Message("Ideal Greenhouse Brightnes", sender = 'ngan420074@gmail.com',
                        recipients = ['cutebozai@gmail.com'])
            msg.body = "LED is working, LDR detects high brightness"
            mail.send(msg)
            last_brightness_high_email_time[recipient] = datetime.now()  # Record the time it was sent
            resp = jsonify({"message": "Ideal brightness alert email sent successfully"})
            resp.status_code = 200
            return resp

        else:
            resp = jsonify({"message": "The high brightness alert email is still on cooldown"})
            resp.status_code = 200
            return resp

#Email temperature remain high for long time and external temp is lower than internal
@app.route('/tempCantAdjust', methods = ['GET','POST'])
def sending_mail_temp_cant_drop():
    if request.method =='POST':
        recipient = 'cutebozai@gmail.com'
        if recipient not in last_high_temp_low_ex_email_time or (datetime.now() - last_high_temp_low_ex_email_time[recipient]) >= timedelta(hours=1):
            msg = Message("Non-ideal temperature for long period", sender = 'ngan420074@gmail.com',
                        recipients = ['cutebozai@gmail.com'])
            msg.body = "Please check whether the humidifier are working normally to help cooldown greenhouse"
            mail.send(msg)
            last_high_temp_low_ex_email_time[recipient] = datetime.now()  # Record the time it was sent
            resp = jsonify({"message": "Temperature not adjusting alert email sent successfully"})
            resp.status_code = 200
            return resp

        else:
            resp = jsonify({"message": "High temperature not dropping alert email is still on cooldown"})
            resp.status_code = 200
            return resp


@app.route('/humidifierCantHelpAdjustTemp', methods = ['GET','POST'])
def sending_mail_humidifier_and_fan_cant__help_drop():
    if request.method =='POST':
        recipient = 'cutebozai@gmail.com'
        if recipient not in last_all_on_time or (datetime.now() - last_all_on_time[recipient]) >= timedelta(hours=1):
            msg = Message("Non ideal temperature for long period, triggering humidifier addition to full speed fan does not help", sender = 'ngan420074@gmail.com',
                        recipients = ['cutebozai@gmail.com'])
            msg.body = "Please check whether the fan and humidifier are working normally to help adjust greenhouse temperature"
            mail.send(msg)
            last_all_on_time[recipient] = datetime.now()
            resp = jsonify({"message": "Temperature not adjusting to ideal range alert email sent successfully"})
            resp.status_code = 200
            return resp

        else:
            resp = jsonify({"message": "Alert email is still on cooldown"})
            resp.status_code = 200
            return resp
        


@app.route('/humidifierCantAdjustToIdeal', methods = ['GET','POST'])
def sending_mail_humidifier_cant__help_drop():
    if request.method =='POST':
        recipient = 'cutebozai@gmail.com'
        if recipient not in last_humidifier_on_time or (datetime.now() - last_humidifier_on_time[recipient]) >= timedelta(hours=1):
            msg = Message("Non ideal humidity for long period", sender = 'ngan420074@gmail.com',
                        recipients = ['cutebozai@gmail.com'])
            msg.body = "Please check whether the humidifier are working normally."
            mail.send(msg)
            last_humidifier_on_time[recipient] = datetime.now()
            resp = jsonify({"message": "Temperature not adjusting to ideal range alert email sent successfully"})
            resp.status_code = 200
            return resp

        else:
            resp = jsonify({"message": "Alert email is still on cooldown"})
            resp.status_code = 200
            return resp

#Pump not working alert email
@app.route('/pumpOperation', methods = ['GET','POST'])
def sending_mail_pump_not_working():
    if request.method =='POST':
        recipient = 'cutebozai@gmail.com'
        if recipient not in last_pump_alert_email_time or (datetime.now() - last_pump_alert_email_time[recipient]) >= timedelta(hours=1):
            msg = Message("No water coming out from outlet number 3", sender = 'ngan420074@gmail.com',
                        recipients = ['cutebozai@gmail.com'])
            msg.body = "Please check whether the pump is working, no water is detected at outlet number 3."
            mail.send(msg)
            last_pump_alert_email_time[recipient] = datetime.now()  # Record the time it was sent
            resp = jsonify({"message": "Pump condition alert email sent successfully"})
            resp.status_code = 200
            return resp
        
        else:
            resp = jsonify({"message": "The pump condition alert email is still on cooldown"})
            resp.status_code = 200
            return resp        


# Email refill water for humidifier
@app.route('/humidifierwater', methods=['GET', 'POST'])
def refill_humidifier_water():
    if request.method == 'POST':
        recipient = 'cutebozai@gmail.com'
        msg = Message("Refill water for humidifier", sender='ngan420074@gmail.com', recipients=['cutebozai@gmail.com'])
        msg.body = "Please add water for humidifier."
        mail.send(msg)
        resp = jsonify({"message": "Refill humidifier water alert email sent successfully"})
        resp.status_code = 200
        return resp


#Chart Webpage
@app.route('/')
def chart():
    return render_template('chart.html')

#Overview webpage
@app.route('/overview')
def overview():
    return render_template('overview.html')

#Control Page
@app.route('/control', methods = ['GET','POST'])
def control():
    return render_template('control.html')

# Handle form submissions and update data in MongoDB
@app.put('/update/<id>')
def update(id):
    _json = request.json
    new_limit = _json.get('limit')  

    # Ensure 'sensor_id' is not None and 'new_limit' is not None before updating
    if id and new_limit is not None:
        # Update the document in MongoDB based on the 'sensor_id'
        db.sensors.update_one({'sensor_id': 'relay_limit'}, {"$set": {'limit': new_limit}})
        resp = jsonify({"message": "Humidifier trigger limit updated successfully"})
        resp.status_code = 200
        return resp
    else:
        resp = jsonify({"message": "Invalid data provided"})
        resp.status_code = 400
        return resp

@app.put('/update/upperhumidity/<id>')
def u_update(id):
    _json = request.json
    new_u_limit = _json.get('u_limit')  

    # Ensure 'sensor_id' is not None and 'new_limit' is not None before updating
    if id and new_u_limit is not None:
        # Update the document in MongoDB based on the 'sensor_id'
        db.sensors.update_one({'sensor_id': 'relay_limit'}, {"$set": {'u_limit': new_u_limit}})
        resp = jsonify({"message": "Humidifier trigger limit updated successfully"})
        resp.status_code = 200
        return resp
    else:
        resp = jsonify({"message": "Invalid data provided"})
        resp.status_code = 400
        return resp

#get latest "START TEST" button pressed time
@app.route('/get_start_button_pressed_time/<id>', methods=['GET'])
def get_start_test_button_time(id):
    try:
        # Query the database to find the document with the specified _id
        document = db.sensors.find_one({'button_id': "start_test_button"})

        if document:
            # Extract the 'sensor_id' and 'limit' fields from the document
            button_id = document.get('button_id')
            button_pressed_time = document.get('button_pressed_time')

            # Create a dictionary with the extracted data
            result = {
                "_id": id,
                "button_id": button_id,
                "button_pressed_time": button_pressed_time,
            }

            return jsonify(result)
        else:
            return jsonify({"message": "Timing not found"}), 404
        
    except Exception as e:
        return jsonify({"message": "Error occurred", "error": str(e)}), 500

#Update latest "START TEST" button pressed time
@app.put('/update_start_button_pressed_time/<id>')
def update_button_pressed_time(id):
    _json = request.json
    new_button_pressed_time = _json.get('button_pressed_time')  

    # Ensure 'sensor_id' is not None and 'new_limit' is not None before updating
    if id and new_button_pressed_time is not None:
        # Update the document in MongoDB based on the 'sensor_id'
        db.sensors.update_one({'button_id': 'start_test_button'}, {"$set": {'button_pressed_time': new_button_pressed_time}})
        resp = jsonify({"message": "Latest start test button pressed time updated successfully"})
        resp.status_code = 200
        return resp
    else:
        resp = jsonify({"message": "Invalid data provided"})
        resp.status_code = 400
        return resp

#Update humidifier operating interval
@app.put('/update/interval/<id>')
def interval_update(id):
    _json= request.json
    new_interval = _json.get('interval')

    if id and new_interval is not None:
        db.sensors.update_one({'sensor_id':'humidifier_interval'},{"$set":{'interval':new_interval}})
        resp = jsonify({"message": "Humidifier lower operating interval update succesfully"})
        resp.status_code = 200
        return resp
    
    else:
        resp = jsonify({"message": "Invalid data provided"})
        resp.response_code = 400
        return resp


#Average data from 1 hour ago
@app.get("/api/average_reading")
def get_average():
    sensor_id = request.args.get('sensor_id')
    
    # Calculate the time threshold for the last 1 hour
    three_hours_ago = datetime.now() - timedelta(hours=1)
    
    filter = {
        "timestamp": {"$gte": three_hours_ago.isoformat()}  # Convert to ISO format
    }
    
    if sensor_id is not None:
        filter["sensor_id"] = sensor_id

    # Sort by timestamp in descending order and limit to the latest 10 records
    sensors = list(db.sensors.find(filter).sort("timestamp", DESCENDING))

    response = Response(
        response=dumps(sensors), status=200,  mimetype="application/json")
    return response


@app.route('/api/sensors/<id>/limit', methods=['GET'])
def get_sensor_limit(id):
    try:
        # Query the database to find the document with the specified _id
        document = db.sensors.find_one({'sensor_id': "relay_limit"})

        if document:
            # Extract the 'sensor_id' and 'limit' fields from the document
            sensor_id = document.get('sensor_id')
            limit = document.get('limit')
            u_limit = document.get('u_limit')


            # Create a dictionary with the extracted data
            result = {
                "_id": id,
                "sensor_id": sensor_id,
                "limit": limit,
                "u_limit": u_limit,
            }

            return jsonify(result)
        else:
            return jsonify({"message": "Sensor not found"}), 404
        
    except Exception as e:
        return jsonify({"message": "Error occurred", "error": str(e)}), 500


#Get pH limit
@app.route('/api/sensors/<id>/ph', methods=['GET'])
def get_pH_limit(id):
    try:
        # Query the database to find the document with the specified _id
        document = db.sensors.find_one({'sensor_id': "ph_sensor_limit"})

        if document:
            # Extract the 'sensor_id' and 'limit' fields from the document
            sensor_id = document.get('sensor_id')
            limit = document.get('pHlimit')
            u_limit = document.get('u_pHlimit')


            # Create a dictionary with the extracted data
            result = {
                "_id": id,
                "sensor_id": sensor_id,
                "pHlimit": limit,
                "u_pHlimit": u_limit,
            }

            return jsonify(result)
        else:
            return jsonify({"message": "Sensor not found"}), 404
        
    except Exception as e:
        return jsonify({"message": "Error occurred", "error": str(e)}), 500


#Get EC limit
@app.route('/api/sensors/<id>/ec', methods=['GET'])
def get_EC_limit(id):
    try:
        # Query the database to find the document with the specified _id
        document = db.sensors.find_one({'sensor_id': "ec_sensor_limit"})

        if document:
            # Extract the 'sensor_id' and 'limit' fields from the document
            sensor_id = document.get('sensor_id')
            limit = document.get('EClimit')
            u_limit = document.get('u_EClimit')


            # Create a dictionary with the extracted data
            result = {
                "_id": id,
                "sensor_id": sensor_id,
                "EClimit": limit,
                "u_EClimit": u_limit,
            }

            return jsonify(result)
        else:
            return jsonify({"message": "Sensor not found"}), 404
        
    except Exception as e:
        return jsonify({"message": "Error occurred", "error": str(e)}), 500


@app.route('/update/ideal/<id>', methods=['GET'])
def get_sensor_ideal_temp_limit(id):
    try:
        # Query the database to find the document with the specified _id
        document = db.sensors.find_one({'sensor_id': "ideal_temp"})

        if document:
            # Extract the 'sensor_id' and 'limit' fields from the document
            sensor_id = document.get('sensor_id')
            lower_limit = document.get('lower_limit_value')
            upper_limit = document.get('upper_limit_value')

            # Create a dictionary with the extracted data
            result = {
                "_id": id,
                "sensor_id": sensor_id,
                "lower_limit_value": lower_limit,
                "upper_limit_value": upper_limit
            }

            return jsonify(result)
        else:
            return jsonify({"message": "Sensor not found"}), 404
        
    except Exception as e:
        return jsonify({"message": "Error occurred", "error": str(e)}), 500

#update pH limit
@app.put('/update/idealpH/<id>')
def update_idealpH_lower(id):
    _json = request.json
    new_lower_limit = _json.get('pHlimit')  

    # Ensure 'sensor_id' is not None and 'new_limit' is not None before updating
    if id and new_lower_limit is not None:
        # Update the document in MongoDB based on the 'sensor_id'
        db.sensors.update_one({'sensor_id': 'ph_sensor_limit'}, {"$set": {'pHlimit': new_lower_limit}})
        resp = jsonify({"message": "Ideal pH lower limit updated successfully"})
        resp.status_code = 200
        return resp
    else:
        resp = jsonify({"message": "Invalid data provided"})
        resp.status_code = 400
        return resp

@app.put('/update/idealpH/upper/<id>')
def update_idealpH_upper(id):
    _json = request.json
    new_upper_limit = _json.get('u_pHlimit')  

    # Ensure 'sensor_id' is not None and 'new_limit' is not None before updating
    if id and new_upper_limit is not None:
        # Update the document in MongoDB based on the 'sensor_id'
        db.sensors.update_one({'sensor_id': 'ph_sensor_limit'}, {"$set": {'u_pHlimit': new_upper_limit}})
        resp = jsonify({"message": "Ideal pH upper limit updated successfully"})
        resp.status_code = 200
        return resp
    else:
        resp = jsonify({"message": "Invalid data provided"})
        resp.status_code = 400
        return resp


#update EC limit
@app.put('/update/idealEC/<id>')
def update_idealEC_lower(id):
    _json = request.json
    new_lower_limit = _json.get('EClimit')  

    # Ensure 'sensor_id' is not None and 'new_limit' is not None before updating
    if id and new_lower_limit is not None:
        # Update the document in MongoDB based on the 'sensor_id'
        db.sensors.update_one({'sensor_id': 'ec_sensor_limit'}, {"$set": {'EClimit': new_lower_limit}})
        resp = jsonify({"message": "Ideal EC lower limit updated successfully"})
        resp.status_code = 200
        return resp
    else:
        resp = jsonify({"message": "Invalid data provided"})
        resp.status_code = 400
        return resp

@app.put('/update/idealEC/upper/<id>')
def update_idealEC_upper(id):
    _json = request.json
    new_upper_limit = _json.get('u_EClimit')  

    # Ensure 'sensor_id' is not None and 'new_limit' is not None before updating
    if id and new_upper_limit is not None:
        # Update the document in MongoDB based on the 'sensor_id'
        db.sensors.update_one({'sensor_id': 'ec_sensor_limit'}, {"$set": {'u_EClimit': new_upper_limit}})
        resp = jsonify({"message": "Ideal EC upper limit updated successfully"})
        resp.status_code = 200
        return resp
    else:
        resp = jsonify({"message": "Invalid data provided"})
        resp.status_code = 400
        return resp


@app.put('/update/ideal/<id>')
def update_idealTemp_lower(id):
    _json = request.json
    new_lower_limit = _json.get('lower_limit_value')  

    # Ensure 'sensor_id' is not None and 'new_limit' is not None before updating
    if id and new_lower_limit is not None:
        # Update the document in MongoDB based on the 'sensor_id'
        db.sensors.update_one({'sensor_id': 'ideal_temp'}, {"$set": {'lower_limit_value': new_lower_limit}})
        resp = jsonify({"message": "Ideal temp lower limit updated successfully"})
        resp.status_code = 200
        return resp
    else:
        resp = jsonify({"message": "Invalid data provided"})
        resp.status_code = 400
        return resp

@app.put('/update/ideal/upper/<id>')
def update_idealTemp_upper(id):
    _json = request.json
    new_upper_limit = _json.get('upper_limit_value')  

    # Ensure 'sensor_id' is not None and 'new_limit' is not None before updating
    if id and new_upper_limit is not None:
        # Update the document in MongoDB based on the 'sensor_id'
        db.sensors.update_one({'sensor_id': 'ideal_temp'}, {"$set": {'upper_limit_value': new_upper_limit}})
        resp = jsonify({"message": "Ideal temp upper limit updated successfully"})
        resp.status_code = 200
        return resp
    else:
        resp = jsonify({"message": "Invalid data provided"})
        resp.status_code = 400
        return resp

@app.get('/api/sensors/interval/<id>')
def get_humidifier_interval(id):
    try:
        # Query the database to find the document with the specified _id
        # document = db.sensors.find_one({'_id': ObjectId(id)})
        document = db.sensors.find_one({'sensor_id': "humidifier_interval"})

        if document:
            # Extract the 'sensor_id' and 'limit' fields from the document
            sensor_id = document.get('sensor_id')
            interval = document.get('interval')

            # Create a dictionary with the extracted data
            result = {
                "_id": id,
                "sensor_id": sensor_id,
                "interval": interval,
            }

            return jsonify(result)
        else:
            return jsonify({"message": "Sensor not found"}), 404
        
    except Exception as e:
        return jsonify({"message": "Error occurred", "error": str(e)}), 500

#Burst mode activation
@app.put('/edit/humidifiermode/<id>')
def editMode(id):
    _json = request.json
    burst_mode = _json.get('burst_mode')  

    # Ensure 'sensor_id' is not None and 'new_limit' is not None before updating
    if id and burst_mode is not None:
        # Update the document in MongoDB based on the 'sensor_id'
        db.sensors.update_one({'_id': ObjectId(id)}, {"$set": {'burst_mode': burst_mode}})
        resp = jsonify({"message": "Sensor updated successfully"})
        resp.status_code = 200
        return resp
    else:
        resp = jsonify({"message": "Invalid data provided"})
        resp.status_code = 400
        return resp

#Send humidifier mode to esp32 
@app.get('/edit/humidifiermode/<id>')
def getEditMode(id):
    try:
        # Query the database to find the document with the specified _id
        document = db.sensors.find_one({'_id': ObjectId(id)})

        if document:
            # Extract the 'sensor_id' and 'limit' fields from the document
            sensor_id = document.get('sensor_id')
            burstMode = document.get('burst_mode')

            # Create a dictionary with the extracted data
            result = {
                "_id": id,
                "sensor_id": sensor_id,
                "burst_mode": burstMode
            }

            return jsonify(result)
        else:
            return jsonify({"message": "Sensor not found"}), 404
        
    except Exception as e:
        return jsonify({"message": "Error occurred", "error": str(e)}), 500

@app.get("/api/sensors")
def get_sensors():
    sensor_id = request.args.get('sensor_id')
    filter = {} if sensor_id is None else {"sensor_id": sensor_id}
    
    # Sort by timestamp in descending order and limit to the latest 10 records
    sensors = list(db.sensors.find(filter).sort("timestamp", DESCENDING).limit(7))

    response = Response(
        response=dumps(sensors), status=200,  mimetype="application/json")
    return response
    
#Get fan speed
@app.get("/api/fanid")
def get_fan_speed():
    fan_id = request.args.get('fanSpeed')
    filter = {} if fan_id is None else {"fan_id": fan_id}
    
    # Sort by timestamp in descending order and limit to the latest 10 records
    sensors = list(db.sensors.find(filter).sort("timestamp", DESCENDING).limit(10))

    response = Response(
        response=dumps(sensors), status=200,  mimetype="application/json")
    return response

#Update database after user adjust the fan speed using slide bar
@app.put('/update/fanspeed/<id>')
def update_intake_fanspeed(id):
    _json = request.json
    intake_lv1 = _json.get('lv_one')

    # Ensure 'sensor_id' is not None and 'new_limit' is not None before updating
    if id and intake_lv1 is not None:
        # Update the document in MongoDB based on the 'sensor_id'
        db.sensors.update_one({'_id': ObjectId(id)}, {"$set": {'lv_one': intake_lv1}})
        resp = jsonify({"message": "Sensor updated successfully"})
        resp.status_code = 200
        return resp
    else:
        resp = jsonify({"message": "Invalid data provided"})
        resp.status_code = 400
        return resp

@app.put('/update/fanspeed2/<id>')
def update_intake_fanspeed2(id):
    _json = request.json
    intake_lv2 = _json.get('lv_two')


    # Ensure 'sensor_id' is not None and 'new_limit' is not None before updating
    if id and intake_lv2 is not None:
        # Update the document in MongoDB based on the 'sensor_id'
        db.sensors.update_one({'_id': ObjectId(id)}, {"$set": {'lv_two': intake_lv2}})
        resp = jsonify({"message": "Sensor updated successfully"})
        resp.status_code = 200
        return resp
    else:
        resp = jsonify({"message": "Invalid data provided"})
        resp.status_code = 400
        return resp
    
@app.put('/update/fanspeed3/<id>')
def update_intake_fanspeed3(id):
    _json = request.json
    intake_lv3 = _json.get('lv_three')

    # Ensure 'sensor_id' is not None and 'new_limit' is not None before updating
    if id and intake_lv3 is not None:
        # Update the document in MongoDB based on the 'sensor_id'
        db.sensors.update_one({'_id': ObjectId(id)}, {"$set": {'lv_three': intake_lv3}})
        resp = jsonify({"message": "Sensor updated successfully"})
        resp.status_code = 200
        return resp
    else:
        resp = jsonify({"message": "Invalid data provided"})
        resp.status_code = 400
        return resp

@app.put('/update/fanspeed4/<id>')
def update_intake_fanspeed4(id):
    _json = request.json
    intake_lv4 = _json.get('lv_four')

    # Ensure 'sensor_id' is not None and 'new_limit' is not None before updating
    if id and intake_lv4 is not None:
        # Update the document in MongoDB based on the 'sensor_id'
        db.sensors.update_one({'_id': ObjectId(id)}, {"$set": {'lv_four': intake_lv4}})
        resp = jsonify({"message": "Sensor updated successfully"})
        resp.status_code = 200
        return resp
    else:
        resp = jsonify({"message": "Invalid data provided"})
        resp.status_code = 400
        return resp

@app.put('/update/fanspeed5/<id>')
def update_intake_fanspeed5(id):
    _json = request.json
    intake_lv5 = _json.get('lv_five')

    # Ensure 'sensor_id' is not None and 'new_limit' is not None before updating
    if id and intake_lv5 is not None:
        # Update the document in MongoDB based on the 'sensor_id'
        db.sensors.update_one({'_id': ObjectId(id)}, {"$set": {'lv_five': intake_lv5}})
        resp = jsonify({"message": "Sensor updated successfully"})
        resp.status_code = 200
        return resp
    else:
        resp = jsonify({"message": "Invalid data provided"})
        resp.status_code = 400
        return resp


#update exhaust fan speed
#Update database after user adjust the fan speed using slide bar
@app.put('/update/exfanspeed/<id>')
def update_exhaust_fanspeed(id):
    _json = request.json
    exhaust_lv1 = _json.get('lv_one')

    # Ensure 'sensor_id' is not None and 'new_limit' is not None before updating
    if id and exhaust_lv1 is not None:
        # Update the document in MongoDB based on the 'sensor_id'
        db.sensors.update_one({'_id': ObjectId(id)}, {"$set": {'lv_one': exhaust_lv1}})
        resp = jsonify({"message": "Sensor updated successfully"})
        resp.status_code = 200
        return resp
    else:
        resp = jsonify({"message": "Invalid data provided"})
        resp.status_code = 400
        return resp

@app.put('/update/exfanspeed2/<id>')
def update_exhaust_fanspeed2(id):
    _json = request.json
    exhaust_lv2 = _json.get('lv_two')


    # Ensure 'sensor_id' is not None and 'new_limit' is not None before updating
    if id and exhaust_lv2 is not None:
        # Update the document in MongoDB based on the 'sensor_id'
        db.sensors.update_one({'_id': ObjectId(id)}, {"$set": {'lv_two': exhaust_lv2}})
        resp = jsonify({"message": "Sensor updated successfully"})
        resp.status_code = 200
        return resp
    else:
        resp = jsonify({"message": "Invalid data provided"})
        resp.status_code = 400
        return resp
    
@app.put('/update/exfanspeed3/<id>')
def update_exhaust_fanspeed3(id):
    _json = request.json
    exhaust_lv3 = _json.get('lv_three')

    # Ensure 'sensor_id' is not None and 'new_limit' is not None before updating
    if id and exhaust_lv3 is not None:
        # Update the document in MongoDB based on the 'sensor_id'
        db.sensors.update_one({'_id': ObjectId(id)}, {"$set": {'lv_three': exhaust_lv3}})
        resp = jsonify({"message": "Sensor updated successfully"})
        resp.status_code = 200
        return resp
    else:
        resp = jsonify({"message": "Invalid data provided"})
        resp.status_code = 400
        return resp

@app.put('/update/exfanspeed4/<id>')
def update_exhaust_fanspeed4(id):
    _json = request.json
    exhaust_lv4 = _json.get('lv_four')

    # Ensure 'sensor_id' is not None and 'new_limit' is not None before updating
    if id and exhaust_lv4 is not None:
        # Update the document in MongoDB based on the 'sensor_id'
        db.sensors.update_one({'_id': ObjectId(id)}, {"$set": {'lv_four': exhaust_lv4}})
        resp = jsonify({"message": "Sensor updated successfully"})
        resp.status_code = 200
        return resp
    else:
        resp = jsonify({"message": "Invalid data provided"})
        resp.status_code = 400
        return resp

@app.put('/update/exfanspeed5/<id>')
def update_exhaust_fanspeed5(id):
    _json = request.json
    exhaust_lv5 = _json.get('lv_five')

    # Ensure 'sensor_id' is not None and 'new_limit' is not None before updating
    if id and exhaust_lv5 is not None:
        # Update the document in MongoDB based on the 'sensor_id'
        db.sensors.update_one({'_id': ObjectId(id)}, {"$set": {'lv_five': exhaust_lv5}})
        resp = jsonify({"message": "Sensor updated successfully"})
        resp.status_code = 200
        return resp
    else:
        resp = jsonify({"message": "Invalid data provided"})
        resp.status_code = 400
        return resp 
 

#test button state
@app.put("/api/test/<id>")
def update_test_button(id):
    _json = request.json
    new_button_state = _json.get('button_state')  

    # Ensure 'sensor_id' is not None and 'new_limit' is not None before updating
    if id and new_button_state is not None:
        # Update the document in MongoDB based on the 'sensor_id'
        db.sensors.update_one({'sensor_id': 'test_button'}, {"$set": {'button_state': new_button_state}})
        resp = jsonify({"message": "State of test button is updated successfully"})
        resp.status_code = 200
        return resp
    else:
        resp = jsonify({"message": "Invalid data provided"})
        resp.status_code = 400
        return resp

# @app.get("/api/testbutton")
# def get_button_state():
#     try:
#         # Query the database to find the document with the specified _id
#         # document = db.sensors.find_one({'_id': ObjectId(id)})
#         document = db.sensors.find_one({'button_id': "test_button"})

#         if document:
#             # Extract the 'sensor_id' and 'limit' fields from the document
#             button_id = document.get('button_id')
#             button_state = document.get('button_state')

#             # Create a dictionary with the extracted data
#             result = {
#                 "button_id": button_id,
#                 "button_state": button_state,
#             }

#             return jsonify(result)
#         else:
#             return jsonify({"message": "Button not found"}), 404
        
#     except Exception as e:
#         return jsonify({"message": "Error occurred", "error": str(e)}), 500


#water quality test up time
@app.put("/api/qualitytestuptime/<id>")
def update_quality_test_up_time(id):
    _json = request.json
    new_up_time = _json.get('test_up_time')  

    # Ensure 'sensor_id' is not None and 'new_limit' is not None before updating
    if id and new_up_time is not None:
        # Update the document in MongoDB based on the 'sensor_id'
        db.sensors.update_one({'test_id': 'quality_test'}, {"$set": {'test_up_time': new_up_time}})
        resp = jsonify({"message": "The water quality test is updated successfully"})
        resp.status_code = 200
        return resp
    else:
        resp = jsonify({"message": "Invalid data provided"})
        resp.status_code = 400
        return resp

@app.get("/api/qualitytestuptime")
def get_quality_test_up_time():
    try:
        # Query the database to find the document with the specified _id
        # document = db.sensors.find_one({'_id': ObjectId(id)})
        document = db.sensors.find_one({'test_id': "quality_test"})

        if document:
            # Extract the 'sensor_id' and 'limit' fields from the document
            test_id = document.get('test_id')
            test_up_time = document.get('test_up_time')

            # Create a dictionary with the extracted data
            result = {
                "test_id": test_id,
                "test_up_time": test_up_time,
            }

            return jsonify(result)
        else:
            return jsonify({"message": "Test not found"}), 404
        
    except Exception as e:
        return jsonify({"message": "Error occurred", "error": str(e)}), 500


@app.post("/api/sensors")
def add_sensor():
    _json = request.json
    _json["timestamp"] = datetime.now().isoformat()  # Format the timestamp
    db.sensors.insert_one(_json)
    resp = jsonify({"message": "Sensor added successfully"})
    resp.status_code = 200
    return resp


@app.delete("/api/sensors/<id>")
def delete_sensor(id):
    db.sensors.delete_one({'_id': ObjectId(id)})
    resp = jsonify({"message": "Sensor deleted successfully"})
    resp.status_code = 200
    return resp 

@app.put("/api/sensors/<id>")
def update_sensor(id):
    _json = request.json
    db.sensors.update_one({'_id': ObjectId(id)}, {"$set": _json})

    resp = jsonify({"message": "Sensor updated successfully"})
    resp.status_code = 200
    return resp

@app.errorhandler(400)
def handle_400_error(error):
    return make_response(jsonify({"errorCode": error.code, 
                                  "errorDescription": "Bad request!",
                                  "errorDetailedDescription": error.description,
                                  "errorName": error.name}), 400)

@app.errorhandler(404)
def handle_404_error(error):
        return make_response(jsonify({"errorCode": error.code, 
                                  "errorDescription": "Resource not found!",
                                  "errorDetailedDescription": error.description,
                                  "errorName": error.name}), 404)

@app.errorhandler(500)
def handle_500_error(error):
        return make_response(jsonify({"errorCode": error.code, 
                                  "errorDescription": "Internal Server Error",
                                  "errorDetailedDescription": error.description,
                                  "errorName": error.name}), 500)

