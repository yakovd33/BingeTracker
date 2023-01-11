require('dotenv').config();
import app from './Server';

// Start the server
const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
    console.log('Express server started on port: ' + port);
});
