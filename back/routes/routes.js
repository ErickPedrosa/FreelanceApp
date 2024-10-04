function setupRoutes(app) {
app.get('/', (req, res) => {
    res.send('WebSocket server is running.');
});


// Error handling middleware
app.use((err, req, res, next) => {
    logger.error('Unhandled error:', err);
    res.status(500).send('Internal server error');
});
}


module.exports = { setupRoutes };
  