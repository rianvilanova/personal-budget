const express = require('express');
const router = express.Router();

const dbEnvelopes = require('../config/db');
const { createId, findById, deleteById } = require('../helpers/helperfunctions');

// @desc    Ver todos os envelopes
router.get(`/`, async (req, res, next) => {
    try {
        const envelopes = await dbEnvelopes;
        res.status(200).send(envelopes);
    } catch (error) {
        res.send(400).send(error);
    }
});

// @desc    Adicionar uma categoria
router.post(`/`, async (req, res, next) => {
    try {   
        const { title, budget } = req.body;
        const envelopes = await dbEnvelopes;
        const newId = createId(envelopes);
        const newEnvelope = {
            id: newId,
            title: title,
            budget: budget,
        };
        envelopes.push(newEnvelope);
        res.status(201).send(newEnvelope);
    } catch (error) {
        res.status(500).send(err);
    }
});

// @desc    Deletar uma categoria especifica, via ID
router.delete(`/:id`, async (req, res, next) => {
    try {
        const envelopes = await dbEnvelopes;
        const newData = deleteById(envelopes, req.params.id);
        return res.status(201).send(newData);
    } catch (error) {
        res.status(500).send(error);
    }
});

// @desc    Ver uma categoria especifica, via ID
router.get(`/:id`, async (req, res, next) => {
    try {
        const envelopes = await dbEnvelopes;
        const record = findById(envelopes, req.params.id);
        res.status(201).send(record);
    } catch (error) {
        res.status(500).send(error);
    }
});

// @desc    Atualizar uma categoria
router.put(`/:id`, async (req, res, next) => {
    try {
        const envelopes = await dbEnvelopes;
        const { title, budget } = req.body;
        const { id } = req.params;
        const envelope = findById(envelopes, id);
        if (!envelope) {
            return res.status(404).send({ message: "Categoria não encontrada "});
        };
        
        envelope.title = title;
        envelope.budget = budget;
        res.status(201).send(envelope);
    } catch (error) {
        res.status(500).send(error);
    }
});

// @desc    Transferir de uma categoria para outra
router.post(`/:fromId/transfer/:toId`, async (req, res, next) => {
    try {
        const envelopes = await dbEnvelopes;
        const { fromId, toId } = req.params;
        const { amount } = req.body;

        const fromEnv = findById(envelopes, fromId);
        const toEnv = findById(envelopes, toId);

        if (!fromEnv || !toEnv) {
            return res.status(404).send({ message: "Verifique os IDs e tente novamente "});
        }

        if (fromEnv.budget < amount) {
            return res.status(400).send({ message: "O valor a transferir é maior do que o possível"})
        }

        fromEnv.budget -= amount;
        toEnv.budget += amount;

        return res.send(201).send(fromEnv);
    } catch (error) {
        res.status(500).send(error);
    }
});