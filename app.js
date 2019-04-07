const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const rootDir = require('./util/path-helper');
const mainRoutes = require('./routes/main');
const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(rootDir, "public")));
app.use(mainRoutes);
app.use(errorController.get404);

mongoConnect( () => {
    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, () => {
        console.log('server started at port 3000....');
    });

    //for realtime update of votes on the front-end
    const io = require('socket.io')(server);
    io.on('connection', (socket) => {
        //console.log('New user connected');
        socket.on('voted', (option) => {
            io.emit('voted', option);
        });
    });
});
