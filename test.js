const request = require("supertest");
const app = require('./index');

describe("Search for definition", () => {

    test("[Positive] Get existing definition (GET /api)", async () => {
        const term = 'api';
        const response = await request(app).get(`/${term}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBeFalsy();
        expect(response.body.term).toBe(term.toUpperCase());
        expect(response.body.definition).toBe('Описание способов (набор классов, процедур, функций, структур или констант), ' +
            'которыми одна компьютерная программа может взаимодействовать с другой программой.');
    });

    test("[Positive] Get existing definition (GET /Динамическое тестирование)", async () => {
        const term = 'Динамическое тестирование';
        const response = await request(app).get(`/${encodeURI(term)}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBeFalsy();
        expect(response.body.term).toBe(term.toUpperCase());
        expect(response.body.definition).toBe('Тестирование с запуском кода на исполнение.');
    });

    test("[Negative] Get not existing definition (GET /Architecture)", async () => {
        const term = encodeURI('Architecture');
        const response = await request(app).get(`/${term}`);
        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe(`${term.toUpperCase()} was not found`);
        expect(response.body.term).toBeFalsy();
        expect(response.body.definition).toBeFalsy();
    });

    test("[Negative] Get for empty (GET /)", async () => {
        const response = await request(app).get(`/`);
        expect(response.statusCode).toBe(422);
        expect(response.body.error).toBe('No input');
    });
});