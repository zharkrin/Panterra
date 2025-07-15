from flask import Flask, render_template, send_from_directory

app = Flask(__name__, static_folder='frontend/assets', template_folder='frontend')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('frontend/js', path)

@app.route('/assets/<path:path>')
def send_assets(path):
    return send_from_directory('frontend/assets', path)

if __name__ == '__main__':
    app.run(debug=True)