//const express = require('express')
import express from 'express'
const app = express()

app.use(express.json())

let persons = [
    {
        id:1,
        name:"Arto Hellas",
        number:"040-123456"
    },
    {
        id:2,
        name:"Ada Lovelace",
        number:"39-44-5323523"
    },
    {
        id:3,
        name:"Dan Abramov",
        number:"12-43-234345"
    },{
        id:4,
        name:"Arto Hellas",
        number:"39-23-6423122"
    }
]

const generarID = () =>{
    return Math.floor(Math.random() * (100000 - 1)) + 1;
}


app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
    response.send('<p>Phonebook has info for '+ persons.length +' people</p>' +
                '<p>'+ new Date( Date.parse('2012-01-26T13:51:50.417-07:00') ) +'</p>')
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
    if(body.number === "" || body.name === "") {
        return response.status(406).json({ 
            error: 'you must enter a value in the name and number ' 
        })
    }

    for (let i = 0; i < persons.length; i++) {
        if (body.name === persons[i].name) {
            return response.status(406).json({ 
                error: 'name must be unique' 
            }) 
        }
    }
  
    const person = {
        id: generarID(),
        name: body.name,
        number: body.number
    }
  
    persons = persons.concat(person)
    response.json(person)
  })


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
