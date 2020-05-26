const { createLink, getLink, destroyLink, getRoomUsers } = require('../models/links');

test('Checking if createLink is defined', () => {
    expect(createLink()).toBeDefined()
});

test('Creates an object with an id, user and room', () => {
    expect(createLink(1,'Catalin','Camera')).toEqual({
        id: 1,
        username: 'Catalin',
        room: 'Camera'
    });
});

test('Checking if getLink is defined', () => {
    expect(getLink()).toBeDefined()
});

test('Finds an object based on the id', () => {
    expect(getLink(1)).toEqual({
        id: 1,
        username: 'Catalin',
        room: 'Camera'
    });
});

test('Checking if destroyLink is defined', () => {
    expect(destroyLink()).toBeDefined()
});

test('Destroy an object based on the id', () => {
    expect(destroyLink(1)).toEqual({
        id: 1,
        username: 'Catalin',
        room: 'Camera'
    });
});

test('Finds an object based on the id after destroying it', () => {
    expect(getLink(1)).toBeFalsy();
});

test('Checking if getRoomUsers is defined', () => {
    expect(getRoomUsers()).toBeDefined()
});

test('Gets all the users in a room', () => {
    createLink(1,'Catalin','Camera');
    createLink(2,'Stefan','Camera');
    expect(getRoomUsers('Camera')).toEqual([{
        id: 1,
        username: 'Catalin',
        room: 'Camera'
    }, {
        id: 2,
        username: 'Stefan',
        room: 'Camera'
    }])
})