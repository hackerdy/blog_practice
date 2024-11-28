const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const methodOverride = require('method-override')
const { getBlogs, createBlog, getCreateBlog, editPage, editBlog, deleteBlog } = require('./controllers/BlogControllers')
const upload = require('./config/upload')
// const upload = require('./upload')

const app = express()
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/uploads', express.static(path.join(__dirname, 'views/uploads')));
app.use('/css', express.static(path.join(__dirname, 'views/css')));
app.use('/images', express.static(path.join(__dirname, 'views/images')));

app.use(methodOverride('_method'))

mongoose.connect(process.env.DATABASE)
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.log(err.message));

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/blog', (req, res) => {
    res.render('blog')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/features', (req, res) => {
    res.render('features')
})
app.get('/blog', getBlogs)

app.get('/createblog', getCreateBlog)

app.post('/createblog', upload.single('coverImage'), createBlog)

app.get('/edit/:id', editPage)

app.post('/edit/:id', editBlog)

app.post('/delete/:id', deleteBlog)

app.get('*', (req, res) => {
    res.render('404')
})

app.listen(process.env.PORT, () => {
    console.log('Listening on port 5000')
})