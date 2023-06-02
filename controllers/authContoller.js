const AuthService=require("../services/authService")
//   curl -X POST -H "Content-Type: application/json" -d '{"token":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwODNkZDU5ODE2NzNmNjYxZmRlOWRhZTY0NmI2ZjAzODBhMDE0NWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2ODU3NDUwNDAsImF1ZCI6Ijk1NDgyMDk2NDU4OC1sOGJhOHBicWE0OXJpcWN0djlmYTZja3J0MWRidWw3Ny5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwOTAxMTgzNTI3NjQxODE0MzM1NCIsImVtYWlsIjoidGFiYmVyb25saW5lQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhenAiOiI5NTQ4MjA5NjQ1ODgtbDhiYThwYnFhNDlyaXFjdHY5ZmE2Y2tydDFkYnVsNzcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJuYW1lIjoidGFiYmVyIG9ubGluZSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQWNIVHRjRy1EcFZFVUNERXhxTkJCN3lObnRfZ0RXaWh1M3l6ZFphR3hYWj1zOTYtYyIsImdpdmVuX25hbWUiOiJ0YWJiZXIiLCJmYW1pbHlfbmFtZSI6Im9ubGluZSIsImlhdCI6MTY4NTc0NTM0MCwiZXhwIjoxNjg1NzQ4OTQwLCJqdGkiOiIyZGJkMDc0NDQ2ZTgzN2MyY2EyYzQ1NzljYzM4YmVjOGYxMTYzZDJkIn0.WsYE3tOao6J-Yacl2botKx9iVRlG5SwnOSIPYkyTbwv-LuzFe3AWKZAJ43nT_YVTYrRJYho39158RRUNQc-OsA4K5VbDE25mhx0rAxTdUGd7r60y_QxVojyUVUmwm7a1Id09Vugt2th-ODx-DlUjIDoJzQfEUK4n5zOr_XyCoqNz2CfIXXEQzZUwUCGMd1Aos6WiCLn4ORpsB7OkuMcmL9xAFiqwmlo7m6D7X03tI2F1BeBoMVEhV-KmOhKH6jTDpQRHrzIyQh-IHg-pjkq_XGdj4Be4sujD6mrGVgdCcms84uYOyTwOddn1l9GI2VdV7f1z9FHaVRJo68vFMGTDhA"}' http://localhost:3001/api/login

exports.login = async (req, res) => {
    try {
      const token = await AuthService.loginUser(req.body);
      res.json({ data: token, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };