import express from 'express'

const app = express()
const port = 3000

// except the data in json format
app.use(express.json())

app.listen(port, ()=>{
    console.log(`Server is listening at port: ${port}...`)
})

let teaData =[]
let nextId=1

//add a new tea
app.post('/teas', (req,res) =>{
    const {name,price} =req.body
    const newTea ={id:nextId++,name,price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

//get all tea
app.get('/teas',(req,res)=>{
    res.status(200).send(teaData)
})

//get a tea with id
app.get('/teas/:id',(req,res)=>{
    const tea=teaData.find(t=>t.id === parseInt(req.params.id))
    if(!tea){
    return res.status(404).send('Tea not Found')
    }
    return res.status(200).send(tea)
})

//update tea
app.put('/teas/:id', (req,res)=>{
    const tea=teaData.find(t=>t.id === parseInt(req.params.id))

    if(!tea){
        return res.status(404).send('Tea not Found')
    }

    const {name,price} =req.body
    tea.name=name
    tea.price=price
    res.status(200).send(tea)
})

//delete tea
app.delete('/teas/:id', (req,res)=>{
    const index=teaData.findIndex(t=>t.id === parseInt(req.params.id))

    if(index===-1){
        return res.status(404).send('Tea not Found')
    }

    teaData.splice(index,1)
    return res.status(200).send('Deleted')
})