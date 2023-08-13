
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const upload = multer({ dest: 'public/uploads' });

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

mongoose.connect('mongodb+srv://nadaneswarav2002:3Mvwa7LAbkH6I1KE@cluster0.pbpdjhl.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

app.post('/api/register', async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({ error: 'Please provide all the required fields' });
  }

  try {
    const user = new User({ name, email, password, phone });
    await user.save();
    console.log('User registered:', user);
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ error: 'Please provide all the required fields' });
  }

  try {
    const user = await User.findOne({ name, password });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ message: 'User logged in successfully' });
    console.log('User logged in:', user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  locality: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
});

const Admin = mongoose.model('Admin', adminSchema);

app.post('/api/registerA', async (req, res) => {
  const { name, locality, password, phone } = req.body;

  if (!name || !locality || !password || !phone) {
    return res.status(400).json({ error: 'Please provide all the required fields' });
  }

  try {
    const admin = new Admin({ name, locality, password, phone });
    await admin.save();
    console.log('Admin registered:', admin);
    res.json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Error saving admin:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/loginA', async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ error: 'Please provide all the required fields' });
  }

  try {
    const admin = await Admin.findOne({ name, password });
    if (!admin || admin.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ message: 'Admin logged in successfully' });
    console.log('Admin logged in:', admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

const submissionSchema = new mongoose.Schema({
  location: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
  user: String,
  done: { type: Boolean, default: false }
});

const Submission = mongoose.model('Submission', submissionSchema);

app.post('/api/submissions', upload.single('image'), async (req, res) => {
  const { location, category, description, user, done } = req.body;
  const image = req.file ? req.file.filename : '';

  if (!location || !category || !description) {
    return res.status(400).json({ error: 'Please provide all the required fields' });
  }

  try {
    const submission = new Submission({ location, category, description, image, user, done });
    await submission.save();
    console.log('Form submitted:', submission);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    const imageExtension = '.jpg'; 
    const imagePath = '/uploads/' + image + imageExtension;
    res.json({ message: 'Form submitted successfully', imagePath: imagePath });
  } catch (error) {
    console.error('Error saving submission:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/markDone', async (req, res) => {
  const { submissionId } = req.body;

  if (!submissionId) {
    return res.status(400).json({ error: 'Please provide the submission ID' });
  }

  try {
    const submission = await Submission.findById(submissionId);
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    submission.done = true;
    await submission.save();
    console.log('Submission marked as done:', submission);

    res.json({ message: 'Submission marked as done' });
  } catch (error) {
    console.error('Error marking submission as done:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/submissions', async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/favicon.ico', (req, res) => res.status(204));

app.listen(3001, () => {
  console.log('Server started on port 3001');
});
