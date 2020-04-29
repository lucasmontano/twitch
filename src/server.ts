import './bootstrap';
import app from './app';

app.listen(process.env.PORT);
console.log(`🚀  Server ready at ${process.env.URL}`);
