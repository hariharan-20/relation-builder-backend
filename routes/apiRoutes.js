const express = require('express')

const router = express.Router()
const Table = require('../models/table')


router.get('/GetData', async (req, res) => {
    try {
        const data = await Table.find({})
        res.status(200).send({ data })

    } catch (err) {
        res.status(500).json({
            error: {
                message: 'something went wrong'
            }
        })
    }
})

router.post('/SaveData', async (req, res) => {
    try {
        console.log(req.body);
        const { name, tag, relation } = req.body || ''
        if (!name || !tag || !relation) {
            return res.status(400).json({
                error: {
                    message: 'Enter All details'
                }
            })
        }
        // const relationPerson= await Table.find({name:relation});
        // if(!relationPerson){
        //     return res.status(400).json()
        // }
        // const payload= {
        //     name:name,
        //     tag:tag,
        //     relation:relation
        // } 
        // const tableData= await Table.create(payload)

        const newTableData = new Table();
        ;
        newTableData.name = name
        newTableData.tag = tag
        newTableData.relation = relation

        await newTableData.save()

        res.status(200).send({ newTableData })

    } catch (err) {
        res.status(500).json({
            error: {
                message: 'something went wrong'
            }
        })
    }
})

router.post('/GetRelation', async (req, res) => {
    try {
        const { findRelation } = req.body || ''
        if (!findRelation) {
            return res.status(400).json({
                error: {
                    message: 'Select two persons to find relationship'
                }
            })
        }

        const person1 = await Table.find({ name: findRelation[0] })
        const person2 = await Table.find({ relation: findRelation[1] })

        const uniquePerson1 = person1.map((personObj) => {
            return personObj.relation
        })
        console.log(uniquePerson1, 'uni1');

        const uniquePerson2 = person2.map((personObj) => {
            return personObj.name
        })
        console.log(uniquePerson2, 'uni2');


        let commonData = []
        let diffData = []

        commonData = uniquePerson1.filter(person1 => {
            return uniquePerson2.indexOf(person1) !== -1;
        })

        let diffData1 = uniquePerson1.filter(person1 => {
            return uniquePerson2.indexOf(person1) === -1;
        })

        let diffData2 = uniquePerson2.filter(person2 => {
            return uniquePerson1.indexOf(person2) === -1;
        })

        diffData = [...diffData1, ...diffData2]

        console.log(commonData, 'common')
        console.log(diffData, 'diff')


        res.status(200).send({
            person1: findRelation[0],
            person2: findRelation[1],
            commonData: commonData,
            diffData: diffData
        })

    } catch (err) {
        res.status(500).json({
            error: {
                message: 'something went wrong'
            }
        })
    }
})

module.exports = router
