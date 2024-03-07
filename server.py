import http.server
import socketserver
import os
import socket


web_content_dir = os.path.join(os.getcwd())
main_content_dir = os.path.join(os.getcwd(), "Main")
Game_content_dir = os.path.join(os.getcwd(), "games")
main_dir = "Main"
        

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        print("Web_content::",web_content_dir,"\n"
            "main_content::",main_content_dir,"\n"
            "game_content::", Game_content_dir)
        print("self.path::",self.path)
        
        if self.path == "/":
            if os.path.exists(os.path.join(web_content_dir, main_dir, "index.html")):
                print('found File\'s and Starting Server')
                self.path = web_content_dir+"\\"+main_dir+"\\"+"index.html"
            else: 
                print("Can't find index.html")

            
            
        elif self.path.endswith(".html"):
            # Handle html files
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            file_path = self.translate_path(self.path)
            print("file_path:", file_path)
            with open(self.translate_path(self.path), "rb") as file:
                self.wfile.write(file.read())
            return
        elif self.path.endswith(".js"):
            # Handle js files
            self.send_response(200)
            self.send_header("Content-type", "application/javascript")
            self.end_headers()
            file_path = self.translate_path(self.path)
            print("file_path:", file_path)
            with open(self.translate_path(self.path), "rb") as file:
                self.wfile.write(file.read())
            return
        elif self.path.endswith(".css"):
            # Handle CSS files
            self.send_response(200)
            self.send_header("Content-type", "text/css")
            self.end_headers()
            file_path = self.translate_path(self.path)
            print("file_path:", file_path)
            with open(self.translate_path(self.path), "rb") as file:
                self.wfile.write(file.read())
            return
        elif self.path.endswith((".png")):
            # Handle png images 
            self.send_response(200)
            self.send_header("Content-type", "image/png")
            self.end_headers()
            file_path = self.translate_path(self.path)
            print("file_path:", file_path)
            with open(self.translate_path(self.path), "rb") as file:
                self.wfile.write(file.read())
            return
        elif self.path.endswith((".mp4")):
            # Handle MP4 video 
            self.send_response(200)
            self.send_header("Content-type", "video/mp4")
            self.end_headers()
            file_path = self.translate_path(self.path)
            print("file_path:", file_path)
            with open(self.translate_path(self.path), "rb") as file:
                self.wfile.write(file.read())
            return
        elif self.path.endswith((".mp3")):
            # Handle MP3 audio 
            self.send_response(200)
            self.send_header("Content-type", "audio/mp3")
            self.end_headers()
            file_path = self.translate_path(self.path)
            print("file_path:", file_path)
            with open(self.translate_path(self.path), "rb") as file:
                self.wfile.write(file.read())
            return
        # Add more conditions to handle other file types as necessary

        super().do_GET()
        


    #def translate_path(self, path):
    #    # Map requested URLs to the "web_content" directory
    #    web_content_dir = "/Web"  #web_content_dir = "../Web"
    #    main_dir = "Main"
    #    new_path = os.path.normpath(path).lstrip("/")
    #    new_path = os.path.join(web_content_dir,main_dir, new_path)
    #    return new_path
    
    def translate_path(self, path):
        print("path:", path)
        web_content_dir = os.path.join(os.path.dirname(__file__))
        new_path = os.path.normpath(path).lstrip("/")
        new_path = os.path.join(web_content_dir,main_dir, new_path)
        print("new_path:", new_path)
        return new_path
 
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

