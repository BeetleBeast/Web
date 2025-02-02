import http.server
import socketserver
import os
import socket

S_Web_dir = "S:\\Web"
index_html = "index.html"
if os.path.exists(S_Web_dir):
    web_content_dir = os.path.join(S_Web_dir)
    main_content_dir = os.path.join(S_Web_dir, "Main")
    Game_content_dir = os.path.join(S_Web_dir, "games")
    assets_content_dir = os.path.join(S_Web_dir, "Main", "assets")
    main_dir = "Main"
    print(S_Web_dir)
else:
    web_content_dir = os.path.join(os.getcwd())
    main_content_dir = os.path.join(os.getcwd(), "Main")
    Game_content_dir = os.path.join(os.getcwd(), "games")
    assets_content_dir = os.path.join(os.getcwd(), "Main", "assets")
    main_dir = "Main"
    print(os.getcwd())

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        print("self.path::",self.path)
        if self.path == "/":
            if os.path.exists(os.path.join( main_content_dir, index_html)):
                self.path = "/index.html"
            else: 
                print("Can't find index.html")
        elif self.path == "/index.html":
            # Handle the case when self.path is '/index.html'
            self.path = "/index.html"      
        elif self.path.endswith(".html"):
            # Handle html files
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            file_path = self.translate_path(self.path)
            with open(file_path, "rb") as file:
                self.wfile.write(file.read())
            return
        elif self.path.endswith(".js"):
            # Handle js files
            self.send_response(200)
            self.send_header("Content-type", "application/javascript")
            self.end_headers()
            file_path = self.translate_path(self.path)
            with open(file_path, "rb") as file:
                self.wfile.write(file.read())
            return
        elif self.path.endswith(".css"):
            # Handle CSS files
            self.send_response(200)
            self.send_header("Content-type", "text/css")
            self.end_headers()
            file_path = self.translate_path(self.path)
            with open(file_path, "rb") as file:
                self.wfile.write(file.read())
            return
        elif self.path.endswith((".png")):
            # Handle png images 
            self.send_response(200)
            self.send_header("Content-type", "image/png")
            self.end_headers()
            file_path = self.translate_path(self.path)
            with open(file_path, "rb") as file:
                self.wfile.write(file.read())
            return
        elif self.path.endswith((".mp4")):
            # Handle MP4 video 
            self.send_response(200)
            self.send_header("Content-type", "video/mp4")
            self.end_headers()
            file_path = self.translate_path(self.path)
            with open(file_path, "rb") as file:
                self.wfile.write(file.read())
            return
        elif self.path.endswith((".mp3")):
            # Handle MP3 audio 
            self.send_response(200)
            self.send_header("Content-type", "audio/mp3")
            self.end_headers()
            file_path = self.translate_path(self.path)
            with open(file_path, "rb") as file:
                self.wfile.write(file.read())
            return
        # Add more conditions to handle other file types as necessary

        super().do_GET()
        

    def translate_path(self, path):
        '''
        # Get the absolute path of the requested URL
        path = http.server.SimpleHTTPRequestHandler.translate_path(self, path)

        # Ensure the requested path is within the WEB_DIR
        if not path.startswith(web_content_dir):
            path = os.path.join(web_content_dir, os.path.relpath(path, self.server.base_path))
        '''
        new_path = os.path.normpath(path).lstrip("/")
        if new_path.startswith(index_html):
            new_path = new_path[len(index_html) + 1:]
        if "games" in new_path:
            # new_path is a subdirectory of Game_content_dir
            new_path = web_content_dir  + new_path
            print("new_path via Game")
        else:
            # new_path is a subdirectory of main_content_dir wich is default
            new_path = main_content_dir + new_path
            print("new_path via Main")
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
if  __name__ == '__main__':
    print("Web_content::",web_content_dir,"\n"
    "main_content::",main_content_dir,"\n"
    "game_content::", Game_content_dir)

    # Specify the public IP address and ports
    public_ip = get_ip()  #  my public IP
    port = 80  #  port forwarding

    # Starts the web site
    #to much work
    # Create a socket server on the specified IP and port
    with socketserver.TCPServer((public_ip, port), CustomHandler) as httpd:
        print(f"Serving at {public_ip}:{port}")

        # Start the server
        try:
            # Start the HTTP server in a loop
            print("Server is running. Press Ctrl+C to stop.")
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
            httpd.shutdown()  # Stop the server gracefully

