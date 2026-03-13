package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/docker/docker/client"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var (
	dockerClient *client.Client
	daemonSecret string
	upgrader     = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool { return true },
	}
)

type Server struct {
	Identifier  string                 `json:"identifier"`
	Image       string                 `json:"image"`
	Resources   map[string]interface{} `json:"resources"`
	Ports       map[string]int         `json:"ports"`
	Environment map[string]string      `json:"environment"`
	ContainerID string                 `json:"container_id"`
}

var servers = make(map[string]*Server)

func main() {
	var err error
	dockerClient, err = client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		log.Fatal("Failed to create Docker client:", err)
	}

	daemonSecret = os.Getenv("DAEMON_SECRET")
	if daemonSecret == "" {
		daemonSecret = "daemon_secret_key"
	}

	r := gin.Default()
	r.Use(authMiddleware())

	r.POST("/servers", createServer)
	r.POST("/servers/:identifier/start", startServer)
	r.POST("/servers/:identifier/stop", stopServer)
	r.DELETE("/servers/:identifier", deleteServer)
	r.POST("/servers/:identifier/command", sendCommand)
	r.GET("/servers/:identifier/stats", getServerStats)
	r.GET("/servers/:identifier/logs", getServerLogs)
	r.GET("/servers/:identifier/console", consoleWebSocket)

	port := os.Getenv("DAEMON_PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("🔧 MCLEGENDS Daemon running on port %s\n", port)
	r.Run(":" + port)
}

func authMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		auth := c.GetHeader("Authorization")
		if auth != "Bearer "+daemonSecret {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}
		c.Next()
	}
}

func createServer(c *gin.Context) {
	var server Server
	if err := c.BindJSON(&server); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	servers[server.Identifier] = &server
	c.JSON(http.StatusOK, gin.H{"message": "Server created", "identifier": server.Identifier})
}

func startServer(c *gin.Context) {
	identifier := c.Param("identifier")
	server, exists := servers[identifier]
	if !exists {
		c.JSON(http.StatusNotFound, gin.H{"error": "Server not found"})
		return
	}

	// Docker container start logic would go here
	log.Printf("Starting server: %s", identifier)
	c.JSON(http.StatusOK, gin.H{"message": "Server starting", "identifier": identifier})
}

func stopServer(c *gin.Context) {
	identifier := c.Param("identifier")
	if _, exists := servers[identifier]; !exists {
		c.JSON(http.StatusNotFound, gin.H{"error": "Server not found"})
		return
	}

	log.Printf("Stopping server: %s", identifier)
	c.JSON(http.StatusOK, gin.H{"message": "Server stopping", "identifier": identifier})
}

func deleteServer(c *gin.Context) {
	identifier := c.Param("identifier")
	delete(servers, identifier)
	c.JSON(http.StatusOK, gin.H{"message": "Server deleted"})
}

func sendCommand(c *gin.Context) {
	identifier := c.Param("identifier")
	var body struct {
		Command string `json:"command"`
	}
	if err := c.BindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	log.Printf("Sending command to %s: %s", identifier, body.Command)
	c.JSON(http.StatusOK, gin.H{"message": "Command sent"})
}

func getServerStats(c *gin.Context) {
	identifier := c.Param("identifier")
	c.JSON(http.StatusOK, gin.H{
		"identifier":   identifier,
		"cpu_usage":    25.5,
		"memory_usage": 2048,
		"disk_usage":   5120,
		"network_rx":   1024000,
		"network_tx":   512000,
		"uptime":       3600,
		"players":      5,
		"tps":          20.0,
	})
}

func getServerLogs(c *gin.Context) {
	identifier := c.Param("identifier")
	c.JSON(http.StatusOK, []string{
		"[INFO] Server starting...",
		"[INFO] Loading world...",
		"[INFO] Server started successfully",
	})
}

func consoleWebSocket(c *gin.Context) {
	identifier := c.Param("identifier")
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Println("WebSocket upgrade error:", err)
		return
	}
	defer conn.Close()

	log.Printf("Console WebSocket connected for server: %s", identifier)
	
	for {
		_, message, err := conn.ReadMessage()
		if err != nil {
			break
		}
		log.Printf("Received: %s", message)
	}
}
