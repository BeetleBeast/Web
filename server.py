import http.server
import socketserver
import os

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Handle requests for the root URL ("/") by serving "index.html"
        if self.path == "/":
            self.path = "/Web/Main/index.html"
        elif self.path == "/options_NG.html":
            # Handle requests for html files in the "Main" directory
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

    def translate_path(self, path):
        # Map requested URLs to the "web_content" directory

        web_content_dir = "../Web"
        main_dir = "Main"
        new_path = os.path.normpath(path).lstrip("/")
        new_path = os.path.join(web_content_dir,main_dir, new_path)
        return new_path
    



   # directory = "Web"


# Specify the public IP address and port you want to use
public_ip = "192.168.1.48"  # Replace with your public IP
port = 80  # You may need to configure port forwarding on your router



if not os.path.exists("/Web"):
    print('can not find It')
else: print('can find It')

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
