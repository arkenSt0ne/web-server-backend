console.log('server.ts');
import errorHandler from 'errorhandler';
import app from './app';
import { Router } from './router';

if (process.env['NODE_ENV'] == 'development') {
    app.use(errorHandler());
}
Router.registerRoutes(app);
const startServer = async () => {
    app.listen(app.get('port'), () => {
        console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
        console.log('Press Ctrl + C  to Stop');
    });

};
startServer();
