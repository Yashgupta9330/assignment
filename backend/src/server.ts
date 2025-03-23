import express from 'express';
import dotenv from 'dotenv';
import doctorRoutes from './routes/DoctorRoute';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));

app.options('*', cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', doctorRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
