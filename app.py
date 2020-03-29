#!/usr/bin/env python3

from flask import Flask, request, abort, jsonify, send_from_directory
import os
app = Flask(__name__, static_url_path='/static')
app.config["DEBUG"] = True


@app.route('/', methods=['GET'])
def home():
    return app.send_static_file('index.html')


@app.route('/contact', methods=['GET'])
def contactUs():
    return app.send_static_file('contactus.html')

@app.route('/about', methods=['GET'])
def aboutUs():
    return app.send_static_file('about.html')

@app.route('/*', methods=['GET'])
def invalidReq():
    return '<h1>INVALID REQUEST</h1>'
    #return "<h1>Distant Reading Archive</h1><p>This site is a prototype API for distant reading of science fiction novels.</p>"

'''def abort(errCode):
    return jsonify({error: "Please provide url in request", status: errCode})
'''

#@app.route('/js/<path:path>')
#def send_js(path):
#    return send_from_directory('js', path)


@app.route('/getAnalysisReport', methods=['POST'])
def getAnalysisReport():
    # print(request.headers)
    # print(request.get_json())
    print('request.form = {}'.format(request.form))
    # print(request.form['url'])
    print(request.form.get('url'))
    print(request.form.get('flags'))
    print(request.form.get('scanType'))

    #print(request.json.get(url))
    #print(request.get(url))
    print("=======")
    if not request.form or not 'url' in request.form:
        print("Aborting request.")
        abort(400)
    import subprocess
    # print(request.form.get('scanType'))
    if request.form.get('scanType') == 'nmap':
        cmd = "python nmap-pipe.py {} {}".format(request.form.get('url'), request.form.get('flags'))
    elif request.form.get('scanType') == 'whois':
        cmd = "python whois-pipe.py {}".format(request.form.get('url'))
    elif request.form.get('scanType') == 'nikto':
        cmd = "python nikto-pipe.py {}".format(request.form.get('url'))
    elif request.form.get('scanType') == 'grabber':
        cmd = "python grabber-pipe.py {} {}".format(request.form.get('url'), request.form.get('flags'))
    else:
        return "Invalid scan type"
    #output = subprocess.call(cmd,shell=True)
    p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, shell=True)
    #print(p)
    #print(p.stdout)
    out, err = p.communicate()
    #print(out)
    #result = out.split('\n')
    #for lin in result:
        #if not lin.startswith('#'):
            #print(lin)
    return out



@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404


app.run()
