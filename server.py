import http.server
import socketserver
import os
import socket

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Handle requests for the root URL ("/") by serving "index.html"
        if self.path == "/":
            if not os.path.exists("Main/index.html"):
                print('can\'t find index')
                print('trying to scan files...')
                # Get a list of all directories in the current directory
                directories = [d for d in os.listdir('.') if os.path.isdir(d)]
                for directory in directories:
                    # Check if the "index.html" file exists in the "Main" directory
                    index_path = os.path.join(directory, 'index.html')
                    if os.path.exists(index_path) and directory == "Main":
                        print(f'found in {directory}!')
                        self.path = "/Web/Main/index.html"  # Serve the "index.html" file in the "Main" directory
                        break
                else:
                    print('done scanning!')
                    print('no file found in Main folder')
            else:
                print('found Files and Starting Server')
                self.path = "/Web/Main/index.html"  # Serve the "index.html" file in the "Main" directory
        elif self.path == "/index.html":
            # Handle requests for html files in the "Main" directory
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            with open(self.translate_path(self.path), "rb") as file:
                self.wfile.write(file.read())
            return
        elif self.path.endswith(".html"):
            # Handle html files
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            with open(self.translate_path(self.path), "rb") as file:
                self.wfile.write(file.read())
            return
        elif self.path.endswith(".js"):
            # Handle js files
            self.send_response(200)
            self.send_header("Content-type", "application/javascript")
            self.end_headers()
            with open(self.translate_path(self.path), "rb") as file:
                self.wfile.write(file.read())
            return
        elif self.path.endswith(".css"):
            # Handle CSS files
            self.send_response(200)
            self.send_header("Content-type", "text/css")
            self.end_headers()
            with open(self.translate_path(self.path), "rb") as file:
                self.wfile.write(file.read())
            return
        elif self.path.endswith((".png")):
            # Handle png images (you can add more extensions as needed)
            self.send_response(200)
            self.send_header("Content-type", "image/png")
            self.end_headers()
            with open(self.translate_path(self.path), "rb") as file:
                self.wfile.write(file.read())
            return
        elif self.path.endswith((".mp4")):
            # Handle png images (you can add more extensions as needed)
            self.send_response(200)
            self.send_header("Content-type", "video/mp4")
            self.end_headers()
            with open(self.translate_path(self.path), "rb") as file:
                self.wfile.write(file.read())
            return
        elif self.path.endswith((".mp3")):
            # Handle png images (you can add more extensions as needed)
            self.send_response(200)
            self.send_header("Content-type", "audio/mp3")
            self.end_headers()
            with open(self.translate_path(self.path), "rb") as file:
                self.wfile.write(file.read())
            return
        # Add more conditions to handle other file types as necessary

        super().do_GET()
        


    #def translate_path(self, path):
    #    # Map requested URLs to the "web_content" directory
    #
    #    web_content_dir = "/Web"  #web_content_dir = "../Web"
    #    main_dir = "Main"
    #    new_path = os.path.normpath(path).lstrip("/")
    #    new_path = os.path.join(web_content_dir,main_dir, new_path)
    #    return new_path
    
def translate_path(self, path):
    # Map requested URLs to the "Web" directory
    web_content_dir = "/Web"
    main_dir = "Main"
    new_path = os.path.normpath(path).lstrip("/")
    new_path = os.path.join(web_content_dir, main_dir, new_path)
    if not new_path.startswith(web_content_dir):
        new_path = os.path.join(web_content_dir, new_path)
    return new_path



   # directory = "Web"
 
def get_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.settimeout(0)
    try:
        # doesn't even have to be reachable
        s.connect(('10.254.254.254', 1))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP
print('New Ip =>',get_ip())

# Specify the public IP address and ports
public_ip = get_ip()  #  my public IP
port = 80  #  port forwarding





# Create a socket server on the specified IP and port
with socketserver.TCPServer((public_ip, port), CustomHandler) as httpd:
    print(f"Serving at {public_ip}:{port}")

    # Start the server
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")


# Add this code at the end of your script
input("Press Enter to exit...")
