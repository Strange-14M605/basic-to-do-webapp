//This is a Restful Api using postgres!

import express from "express"
import cors from "cors"
import pool from "./db.js"

const app = express();
const port= 5000;

pool.connect();

//middleware
app.use(cors());
app.use(express.json());   //gives access to req.body to get a hold of user input

//Routes

//create a to do
app.post("/todos", async(req,res)=>{
    try {
        // console.log(req.body);
        const {description}= req.body;
        //It extracts the description property from the req.body object and assigns it to a new variable named description.
        const newTodo= await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING * ", [description]);
        res.json(newTodo.rows[0]);    //returns 
    } catch (error) {
        console.error(error.message);
    }
})

//get all to dos
app.get("/todos", async(req,res)=>{
    try {
        const allTodos= await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message)
    }
})

//get one to do
app.get("/todos/:id", async(req,res)=>{
    try {
        // console.log(req.params);
        const {id} = req.params; //stores id thats inside req.params
        const oneTodo= await pool.query("SELECT * FROM todo WHERE todo_id=$1", [id]);
        res.json(oneTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})

//update a to do
app.put("/todos/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description= $1 WHERE todo_id= $2 RETURNING *", [description, id]);
        res.json(updateTodo.rows);
        } catch (error) {
        console.error(error.message);
    }
})

//delete a to do
app.delete("/todos/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const deleteTodo= await pool.query("DELETE FROM todo where todo_id= $1  RETURNING *", [id]);
        res.json(deleteTodo.rows);
    } catch (error) {
        console.error(error.message);
    }
})

app.listen(port, ()=>{
    console.log(`Server running on ${port}`)
})