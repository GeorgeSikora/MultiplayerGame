
const PORT = 8088; // server admin service port

app.use(express.static('service/page'));
app.use((req, res, next) => {
    res.status(404).send('page not found :( ' + req.url);
});
app.listen(PORT, () => {
    console.log('Server service on port ' + PORT)
});