const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();


router.post("/", async (req, res, next)=>{
    
      try {
        const {code, name, age, race, hp, mana, date_added } = req.body;
        //   De no recibir todos los parámetros necesarios debería devolver un status 404 con el mensaje "Falta enviar datos obligatorios"
        if(!code || !name || !hp || !mana) return res.status(404).send("Falta enviar datos obligatorios")
        const newCharacter = await Character.create({
          code,
          name,
          age, 
          race,
          hp,
          mana,
          date_added,
        })
        return res.status(201).json(newCharacter)
        // insert into TABLA (ATRIBUTOS) values (VALORES)
      } catch (error) {
        // Si alguna validación interna de la base de datos falle debe devolver un status 404 con el mensaje "Error en alguno de los datos provistos"
        return res.status(404).send("Error en alguno de los datos provistos")
      }
    
    // Si todos los datos son provistos debera devolver un status 201 y el objeto del personaje
    })

    router.get("/", async (req, res, next)=>{
        const { race, age  } = req.query;
        const condition = {};
        const where = {};

        if (race){
            where.race = race;
        }
        if(age){
            where.age = age;
        }
        
        condition.where = where;
        const personaje = await Character.findAll(condition);
        return res.json(personaje);

    })

    router.get('/young', async (req, res)=> {
       
            const personaje = await Character.findAll({
                where: { age: {[Op.lt]: 25},},
            });
            return res.json(personaje)
    });

    router.get("/:code", (req, res ,next)=>{
      const { code } = req.params
      Character.findByPk(code)
      .then((character)=>{
        if(!character) return res.status(404).send(`El código ${code} no corresponde a un personaje existente`)
        res.send(character)
      })
      .catch((error)=>{
        next(error)
      })
    
    })

    router.put('/:atributes', async(req, res)=>{
        
    })

    



    



    
    





module.exports = router;